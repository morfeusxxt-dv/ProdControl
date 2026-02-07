package com.prodcontrol.controller;

import com.prodcontrol.domain.ProductionOrder;
import com.prodcontrol.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
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
