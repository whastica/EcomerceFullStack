package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.PostalCode;
import java.util.List;
import java.util.Optional;

public interface PostalCodeRepository {
    PostalCode save(PostalCode postalCode);
    Optional<PostalCode> findById(Long id);
    List<PostalCode> findAll();
    Optional<PostalCode> findByCode(String code);
    void deleteById(Long id);
    boolean existsByCode(String code);
}