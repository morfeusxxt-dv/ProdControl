package com.prodcontrol.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "product_materials", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"product_id", "material_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "material_id", nullable = false)
    private Material material;

    @Column(name = "quantity_required", nullable = false)
    private BigDecimal quantityRequired;
}
