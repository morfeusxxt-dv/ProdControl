package com.prodcontrol.controller;

import com.prodcontrol.domain.Material;
import com.prodcontrol.repository.MaterialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    private final MaterialRepository materialRepository;

    public MaterialController(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    @GetMapping
    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Material> create(@Valid @RequestBody MaterialCreateRequest request) {
        Material material = new Material();
        material.setName(request.name());
        material.setDescription(request.description());
        material.setUnitCost(request.unitCost());
        material.setStockQuantity(request.stockQuantity());
        
        Material saved = materialRepository.save(material);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Material> update(@PathVariable UUID id, @Valid @RequestBody MaterialUpdateRequest request) {
        if (!materialRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        Material material = materialRepository.findById(id).orElseThrow();
        material.setName(request.name());
        material.setDescription(request.description());
        material.setUnitCost(request.unitCost());
        material.setStockQuantity(request.stockQuantity());
        
        return ResponseEntity.ok(materialRepository.save(material));
    }

    public record MaterialCreateRequest(
        @NotBlank(message = "Name is required")
        String name,
        String description,
        
        @NotNull(message = "Unit cost is required")
        @DecimalMin(value = "0.0", message = "Unit cost must be positive")
        java.math.BigDecimal unitCost,
        
        @NotNull(message = "Stock quantity is required")
        @DecimalMin(value = "0.0", message = "Stock quantity must be positive")
        java.math.BigDecimal stockQuantity
    ) {}

    public record MaterialUpdateRequest(
        @NotBlank(message = "Name is required")
        String name,
        String description,
        
        @NotNull(message = "Unit cost is required")
        @DecimalMin(value = "0.0", message = "Unit cost must be positive")
        java.math.BigDecimal unitCost,
        
        @NotNull(message = "Stock quantity is required")
        @DecimalMin(value = "0.0", message = "Stock quantity must be positive")
        java.math.BigDecimal stockQuantity
    ) {}
}
