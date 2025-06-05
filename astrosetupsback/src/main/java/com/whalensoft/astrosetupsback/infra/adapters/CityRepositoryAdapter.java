package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.City;
import com.whalensoft.astrosetupsback.domain.repository.CityRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaCityRepository;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CityRepositoryAdapter implements CityRepository {

    private final JpaCityRepository jpaCityRepository;

    @Override
    public City save(City city) {
        return jpaCityRepository.save(city);
    }

    @Override
    public Optional<City> findById(Long id) {
        return jpaCityRepository.findById(id);
    }

    @Override
    public List<City> findAll() {
        return jpaCityRepository.findAll();
    }

    @Override
    public Optional<City> findByName(String name) {
        return jpaCityRepository.findByName(name);
    }

    @Override
    public void deleteById(Long id) {
        jpaCityRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaCityRepository.existsById(id);
    }
}
