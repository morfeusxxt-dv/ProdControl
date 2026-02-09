package com.prodcontrol.controller;

import com.prodcontrol.domain.ProductionOrder;
import com.prodcontrol.domain.Product;
import com.prodcontrol.repository.ProductionOrderRepository;
import com.prodcontrol.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(
    origins = {
        "https://prodcontrol-lian-git-main-morfeusxxts-projects.vercel.app",
        "https://*.vercel.app"
    },
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
    allowedHeaders = "*",
    maxAge = 3600
)
public class OrderController {

    private final ProductionOrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderController(ProductionOrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<ProductionOrder> getAll() {
        return orderRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ProductionOrder> create(@RequestBody OrderCreateRequest request) {
        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new RuntimeException("Product not found: " + request.productId()));

        ProductionOrder order = new ProductionOrder();
        order.setProduct(product);
        order.setQuantity(request.quantity());
        order.setStatus(com.prodcontrol.domain.ProductionStatus.PENDING);
        order.setCreatedAt(new java.util.Date());

        ProductionOrder saved = orderRepository.save(order);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<ProductionOrder> start(@PathVariable UUID id) {
        ProductionOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        
        order.setStatus(com.prodcontrol.domain.ProductionStatus.IN_PROGRESS);
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ProductionOrder> complete(@PathVariable UUID id) {
        ProductionOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        
        order.setStatus(com.prodcontrol.domain.ProductionStatus.COMPLETED);
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ProductionOrder> cancel(@PathVariable UUID id) {
        ProductionOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        
        order.setStatus(com.prodcontrol.domain.ProductionStatus.CANCELLED);
        return ResponseEntity.ok(orderRepository.save(order));
    }

    public record OrderCreateRequest(
            UUID productId,
            Integer quantity
    ) {}
}
