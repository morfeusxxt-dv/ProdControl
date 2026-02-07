package com.prodcontrol.service;

import com.prodcontrol.domain.*;
import com.prodcontrol.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class ProductionService {

    private final ProductRepository productRepository;
    private final MaterialRepository materialRepository;
    private final ProductMaterialRepository productMaterialRepository;
    private final ProductionOrderRepository productionOrderRepository;

    public ProductionService(ProductRepository productRepository,
                             MaterialRepository materialRepository,
                             ProductMaterialRepository productMaterialRepository,
                             ProductionOrderRepository productionOrderRepository) {
        this.productRepository = productRepository;
        this.materialRepository = materialRepository;
        this.productMaterialRepository = productMaterialRepository;
        this.productionOrderRepository = productionOrderRepository;
    }

    @Transactional
    public ProductionOrder createOrder(UUID productId, BigDecimal quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        ProductionOrder order = new ProductionOrder();
        order.setProduct(product);
        order.setQuantity(quantity);
        order.setStatus(ProductionStatus.PENDING);
        
        return productionOrderRepository.save(order);
    }

    @Transactional
    public ProductionOrder startProduction(UUID orderId) {
        ProductionOrder order = productionOrderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (order.getStatus() != ProductionStatus.PENDING) {
            throw new IllegalStateException("Order must be PENDING to start");
        }

        List<ProductMaterial> bom = productMaterialRepository.findByProductId(order.getProduct().getId());
        
        // Check stock availability
        for (ProductMaterial pm : bom) {
            BigDecimal required = pm.getQuantityRequired().multiply(order.getQuantity());
            if (pm.getMaterial().getStockQuantity().compareTo(required) < 0) {
                throw new IllegalStateException("Insufficient stock for material: " + pm.getMaterial().getName());
            }
        }

        // Deduct stock
        for (ProductMaterial pm : bom) {
            BigDecimal required = pm.getQuantityRequired().multiply(order.getQuantity());
            Material material = pm.getMaterial();
            material.setStockQuantity(material.getStockQuantity().subtract(required));
            materialRepository.save(material);
        }

        order.setStatus(ProductionStatus.IN_PROGRESS);
        return productionOrderRepository.save(order);
    }

    @Transactional
    public ProductionOrder completeProduction(UUID orderId) {
        ProductionOrder order = productionOrderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (order.getStatus() != ProductionStatus.IN_PROGRESS) {
            throw new IllegalStateException("Order must be IN_PROGRESS to complete");
        }

        Product product = order.getProduct();
        product.setStockQuantity(product.getStockQuantity().add(order.getQuantity()));
        productRepository.save(product);

        order.setStatus(ProductionStatus.COMPLETED);
        return productionOrderRepository.save(order);
    }

    
    /**
     * Calculates maximum producible units of a product based on current material stock.
     */
    public BigDecimal calculateMaxProduction(UUID productId) {
        List<ProductMaterial> bom = productMaterialRepository.findByProductId(productId);
        BigDecimal maxProduction = BigDecimal.valueOf(Double.MAX_VALUE);

        if (bom.isEmpty()) {
            return BigDecimal.ZERO; // Or handling products without materials differently
        }

        for (ProductMaterial pm : bom) {
             if (pm.getQuantityRequired().compareTo(BigDecimal.ZERO) == 0) continue;
             
             BigDecimal stock = pm.getMaterial().getStockQuantity();
             BigDecimal maxForMaterial = stock.divide(pm.getQuantityRequired(), 2, java.math.RoundingMode.FLOOR);
             
             if (maxForMaterial.compareTo(maxProduction) < 0) {
                 maxProduction = maxForMaterial;
             }
        }
        
        return maxProduction.compareTo(BigDecimal.valueOf(Double.MAX_VALUE)) == 0 ? BigDecimal.ZERO : maxProduction;
    }
}
