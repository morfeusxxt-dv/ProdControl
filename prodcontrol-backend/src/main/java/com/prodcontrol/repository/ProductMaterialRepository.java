package com.prodcontrol.repository;

import com.prodcontrol.domain.ProductMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface ProductMaterialRepository extends JpaRepository<ProductMaterial, UUID> {
    List<ProductMaterial> findByProductId(UUID productId);
}
