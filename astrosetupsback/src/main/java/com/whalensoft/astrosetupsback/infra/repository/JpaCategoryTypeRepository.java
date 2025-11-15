package com.whalensoft.astrosetupsback.infra.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whalensoft.astrosetupsback.domain.model.CategoryType;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCategoryTypeRepository extends JpaRepository<CategoryType, Long> {

    Optional<CategoryType> findByName(String name);

    boolean existsByName(String name);
}