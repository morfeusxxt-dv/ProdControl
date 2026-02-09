package com.prodcontrol.controller;

import com.prodcontrol.domain.Product;
import com.prodcontrol.domain.ProductMaterial;
import com.prodcontrol.repository.ProductRepository;
import com.prodcontrol.repository.ProductMaterialRepository;
import com.prodcontrol.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMaterialRepository productMaterialRepository;
    private final ProductionService productionService;

    public ProductController(ProductRepository productRepository, 
                             ProductMaterialRepository productMaterialRepository,
                             ProductionService productionService) {
        this.productRepository = productRepository;
        this.productMaterialRepository = productMaterialRepository;
        this.productionService = productionService;
    }

    @GetMapping
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductCreateRequest request) {
        Product product = new Product();
        product.setName(request.name());
        product.setDescription(request.description());
        product.setUnitPrice(request.unitPrice());
        product.setStockQuantity(request.stockQuantity());
        
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{productId}/materials")
    public ProductMaterial addMaterial(@PathVariable UUID productId, @RequestBody ProductMaterial pm) {
        Product product = productRepository.findById(productId).orElseThrow();
        pm.setProduct(product);
        return productMaterialRepository.save(pm);
    }
    
    @GetMapping("/{id}/max-production")
    public ResponseEntity<BigDecimal> getMaxProduction(@PathVariable UUID id) {
        return ResponseEntity.ok(productionService.calculateMaxProduction(id));
    }

    public record ProductCreateRequest(
        @NotBlank(message = "Name is required")
        String name,
        String description,
        
        @NotNull(message = "Unit price is required")
        @DecimalMin(value = "0.0", message = "Unit price must be positive")
        java.math.BigDecimal unitPrice,
        
        @NotNull(message = "Stock quantity is required")
        @DecimalMin(value = "0.0", message = "Stock quantity must be positive")
        java.math.BigDecimal stockQuantity
    ) {}
}
