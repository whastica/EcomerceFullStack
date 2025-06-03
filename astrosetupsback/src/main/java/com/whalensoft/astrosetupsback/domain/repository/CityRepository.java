package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.City;
import java.util.List;
import java.util.Optional;

public interface CityRepository {
    City save(City city);
    Optional<City> findById(Long id);
    List<City> findAll();
    Optional<City> findByName(String name);
    void deleteById(Long id);
    boolean existsById(Long id);
}