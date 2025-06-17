package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.shipping.*;
import java.util.List;

public interface ShippingService {
    // Gestión de Direcciones de Envío
    ShippingAddressDTO createShippingAddress(CreateShippingAddressDTO createAddressDTO);
    ShippingAddressDTO updateShippingAddress(Long id, UpdateShippingAddressDTO updateAddressDTO);
    ShippingAddressDTO getShippingAddressById(Long id);
    List<ShippingAddressSummaryDTO> getAllShippingAddresses();
    void deleteShippingAddress(Long id);
    
    // Gestión de Ciudades y Códigos Postales
    CityDTO createCity(CreateCityDTO createCityDTO);
    CityDTO updateCity(Long id, UpdateCityDTO updateCityDTO);
    List<CitySummaryDTO> getAllCities();
    
    PostalCodeDTO createPostalCode(CreatePostalCodeDTO createPostalCodeDTO);
    PostalCodeDTO updatePostalCode(Long id, UpdatePostalCodeDTO updatePostalCodeDTO);
    List<PostalCodeSummaryDTO> getPostalCodesByCity(Long cityId);
    
    // Cálculo de Costos de Envío
    ShippingCostResponseDTO calculateShippingCost(ShippingCostCalculationDTO calculationDTO);
    
    // Zonas de Envío
    List<ShippingZoneDTO> getAllShippingZones();
    
    // Preferencias de Usuario
    UserShippingPreferencesDTO getUserShippingPreferences(Long userId);
    void updateUserShippingPreferences(Long userId, UserShippingPreferencesDTO preferencesDTO);
    
    // Estadísticas de Envíos
    ShippingStatsDTO getShippingStats();
} 