package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.City;
import com.whalensoft.astrosetupsback.domain.repository.CityRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaCityRepository extends JpaRepository<City, Long>, CityRepository {
}
