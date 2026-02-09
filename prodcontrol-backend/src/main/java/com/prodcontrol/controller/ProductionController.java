package com.prodcontrol.controller;

import com.prodcontrol.domain.ProductionOrder;
import com.prodcontrol.repository.ProductionOrderRepository;
import com.prodcontrol.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/production-orders")
public class ProductionController {

    private final ProductionService productionService;
    private final ProductionOrderRepository productionOrderRepository;

    public ProductionController(ProductionService productionService, ProductionOrderRepository productionOrderRepository) {
        this.productionService = productionService;
        this.productionOrderRepository = productionOrderRepository;
    }

    @GetMapping
    public List<ProductionOrder> getAll() {
        return productionOrderRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ProductionOrder> createOrder(@RequestParam UUID productId, @RequestParam BigDecimal quantity) {
        return ResponseEntity.ok(productionService.createOrder(productId, quantity));
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<ProductionOrder> startProduction(@PathVariable UUID id) {
        return ResponseEntity.ok(productionService.startProduction(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ProductionOrder> completeProduction(@PathVariable UUID id) {
        return ResponseEntity.ok(productionService.completeProduction(id));
    }
}
