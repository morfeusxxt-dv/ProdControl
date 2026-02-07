package com.prodcontrol.controller;

import com.prodcontrol.domain.Product;
import com.prodcontrol.domain.ProductMaterial;
import com.prodcontrol.repository.ProductRepository;
import com.prodcontrol.repository.ProductMaterialRepository;
import com.prodcontrol.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public Product create(@RequestBody Product product) {
        return productRepository.save(product);
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
}
