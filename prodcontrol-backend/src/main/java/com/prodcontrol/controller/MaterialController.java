package com.prodcontrol.controller;

import com.prodcontrol.domain.Material;
import com.prodcontrol.repository.MaterialRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public Material create(@RequestBody Material material) {
        return materialRepository.save(material);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Material> update(@PathVariable UUID id, @RequestBody Material material) {
        if (!materialRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        material.setId(id);
        return ResponseEntity.ok(materialRepository.save(material));
    }
}
