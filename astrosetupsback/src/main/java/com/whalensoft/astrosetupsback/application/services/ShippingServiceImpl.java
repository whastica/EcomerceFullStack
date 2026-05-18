package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.dto.shipping.address.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.cost.PackageDimensionsDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.cost.ShippingCostCalculationDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.cost.ShippingCostResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.location.CitySummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.location.PostalCodeSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.preferences.UserShippingPreferencesDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.stats.ShippingStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.zone.ShippingZoneDTO;
import com.whalensoft.astrosetupsback.application.interfaces.ShippingService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.ShippingAddressRepository;
import com.whalensoft.astrosetupsback.domain.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final UserRepository userRepository;

    public ShippingServiceImpl(
            ShippingAddressRepository shippingAddressRepository,
            UserRepository userRepository) {
        this.shippingAddressRepository = shippingAddressRepository;
        this.userRepository = userRepository;
    }

    // =========================================================
    // GESTIÓN DE DIRECCIONES
    // =========================================================

    @Override
    public ShippingAddressDTO createShippingAddress(CreateShippingAddressDTO dto) {
        throw new UnsupportedOperationException(
                "Usa CustomerService.createShippingAddress(userId, dto) " +
                        "para crear direcciones con usuario autenticado.");
    }

    @Override
    public ShippingAddressDTO updateShippingAddress(Long id, UpdateShippingAddressDTO dto) {
        ShippingAddress address = shippingAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));

        if (dto.getAddressLine1() != null) {
            address.setAddressLine1(dto.getAddressLine1());
        }
        if (dto.getAddressLine2() != null) {
            address.setAddressLine2(dto.getAddressLine2());
        }
        if (dto.getRecipientName() != null) {
            address.setRecipientName(dto.getRecipientName());
        }
        if (dto.getPhone() != null) {
            address.setPhone(dto.getPhone());
        }
        if (dto.getIsDefault() != null) {
            if (Boolean.TRUE.equals(dto.getIsDefault())) {
                setOtherAddressesAsNonDefault(address.getUser());
            }
            address.setIsDefault(dto.getIsDefault());
        }

        return convertToShippingAddressDTO(shippingAddressRepository.save(address));
    }

    @Override
    @Transactional(readOnly = true)
    public ShippingAddressDTO getShippingAddressById(Long id) {
        ShippingAddress address = shippingAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));
        return convertToShippingAddressDTO(address);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShippingAddressSummaryDTO> getAllShippingAddresses() {
        return shippingAddressRepository.findAll().stream()
                .map(this::convertToShippingAddressSummaryDTO)
                .toList();
    }

    @Override
    public void deleteShippingAddress(Long id) {
        ShippingAddress address = shippingAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));

        if (!address.getOrders().isEmpty()) {
            throw new RuntimeException(
                    "No se puede eliminar la dirección porque tiene órdenes asociadas");
        }

        shippingAddressRepository.deleteById(id);
    }

    // =========================================================
    // CIUDADES Y CÓDIGOS POSTALES
    // Se extraen desde las direcciones existentes — sin repositorios propios
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<CitySummaryDTO> getAllCities() {
        return shippingAddressRepository.findAll().stream()
                .map(ShippingAddress::getCity)
                .filter(city -> city != null)
                .distinct()
                .map(city -> CitySummaryDTO.builder()
                        .id(city.getId())
                        .name(city.getName())
                        .build())
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PostalCodeSummaryDTO> getPostalCodesByCity(Long cityId) {
        return shippingAddressRepository.findAll().stream()
                .filter(a -> a.getCity() != null && a.getCity().getId().equals(cityId))
                .map(ShippingAddress::getPostalCode)
                .filter(pc -> pc != null)
                .distinct()
                .map(pc -> PostalCodeSummaryDTO.builder()
                        .id(pc.getId())
                        .code(pc.getCode())
                        .build())
                .toList();
    }

    // =========================================================
    // CÁLCULO DE COSTOS
    // =========================================================

    @Override
    public ShippingCostResponseDTO calculateShippingCost(ShippingCostCalculationDTO dto) {
        double baseCost = 15.0;
        double weightFactor = calculateWeightFactor(dto.getPackageWeight());
        double dimensionFactor = calculateDimensionFactor(dto.getDimensions());
        double estimatedCostDouble = Math.round(baseCost * weightFactor * dimensionFactor * 100.0) / 100.0;
        double expressCostDouble = Math.round(estimatedCostDouble * 1.5 * 100.0) / 100.0;

        return ShippingCostResponseDTO.builder()
                .estimatedCost(BigDecimal.valueOf(estimatedCostDouble))
                .estimatedDeliveryDays(3)
                .carrierName("Astro Setups Express")
                .availableServices(List.of("Estándar", "Express"))
                .expressAvailable(true)
                .expressCost(BigDecimal.valueOf(expressCostDouble))
                .build();
    }

    // =========================================================
    // ZONAS DE ENVÍO
    // =========================================================

    @Override
    public List<ShippingZoneDTO> getAllShippingZones() {
        return List.of(
                ShippingZoneDTO.builder()
                        .id(1L).name("Zona Local")
                        .cities(List.of())
                        .baseCost(BigDecimal.valueOf(5.0))
                        .deliveryDays(1).expressAvailable(true).build(),
                ShippingZoneDTO.builder()
                        .id(2L).name("Zona Nacional")
                        .cities(List.of())
                        .baseCost(BigDecimal.valueOf(15.0))
                        .deliveryDays(3).expressAvailable(true).build(),
                ShippingZoneDTO.builder()
                        .id(3L).name("Zona Internacional")
                        .cities(List.of())
                        .baseCost(BigDecimal.valueOf(50.0))
                        .deliveryDays(7).expressAvailable(false).build()
        );
    }

    // =========================================================
    // PREFERENCIAS DE USUARIO
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public UserShippingPreferencesDTO getUserShippingPreferences(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<ShippingAddress> userAddresses = shippingAddressRepository.findByUser(user);

        ShippingAddressSummaryDTO defaultAddress = userAddresses.stream()
                .filter(ShippingAddress::getIsDefault)
                .findFirst()
                .map(this::convertToShippingAddressSummaryDTO)
                .orElse(null);

        // Ciudad preferida como CitySummaryDTO
        CitySummaryDTO preferredCity = userAddresses.stream()
                .filter(a -> a.getCity() != null)
                .collect(Collectors.groupingBy(
                        a -> a.getCity(),
                        Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(e -> CitySummaryDTO.builder()
                        .id(e.getKey().getId())
                        .name(e.getKey().getName())
                        .build())
                .orElse(null);

        return UserShippingPreferencesDTO.builder()
                .addresses(userAddresses.stream()
                        .map(this::convertToShippingAddressSummaryDTO)
                        .toList())
                .defaultAddress(defaultAddress)
                .totalAddresses(userAddresses.size())
                .preferredCity(preferredCity)
                .build();
    }

    @Override
    public void updateUserShippingPreferences(Long userId, UserShippingPreferencesDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (dto.getDefaultAddress() != null) {
            setOtherAddressesAsNonDefault(user);
            ShippingAddress selected = shippingAddressRepository
                    .findById(dto.getDefaultAddress().getId())
                    .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
            selected.setIsDefault(true);
            shippingAddressRepository.save(selected);
        }
    }

    // =========================================================
    // ESTADÍSTICAS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public ShippingStatsDTO getShippingStats() {
        List<ShippingAddress> allAddresses = shippingAddressRepository.findAll();

        long activeAddresses = allAddresses.stream()
                .filter(a -> !a.getOrders().isEmpty())
                .count();

        long totalCities = allAddresses.stream()
                .map(ShippingAddress::getCity)
                .filter(c -> c != null)
                .distinct()
                .count();

        long totalPostalCodes = allAddresses.stream()
                .map(ShippingAddress::getPostalCode)
                .filter(pc -> pc != null)
                .distinct()
                .count();

        long ordersWithShipping = allAddresses.stream()
                .mapToLong(a -> a.getOrders().size())
                .sum();

        // Ciudad más popular como CitySummaryDTO
        CitySummaryDTO mostPopularCity = allAddresses.stream()
                .filter(a -> a.getCity() != null)
                .collect(Collectors.groupingBy(
                        a -> a.getCity(),
                        Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(e -> CitySummaryDTO.builder()
                        .id(e.getKey().getId())
                        .name(e.getKey().getName())
                        .build())
                .orElse(null);

        return ShippingStatsDTO.builder()
                .totalShippingAddresses((long) allAddresses.size())
                .totalCities(totalCities)
                .totalPostalCodes(totalPostalCodes)
                .activeShippingAddresses(activeAddresses)
                .mostPopularCity(mostPopularCity)
                .ordersWithShipping(ordersWithShipping)
                .averageShippingCost(BigDecimal.valueOf(25.0))
                .build();
    }

    // =========================================================
    // HELPERS PRIVADOS
    // =========================================================

    private void setOtherAddressesAsNonDefault(User user) {
        shippingAddressRepository.findByUser(user).stream()
                .filter(ShippingAddress::getIsDefault)
                .forEach(a -> {
                    a.setIsDefault(false);
                    shippingAddressRepository.save(a);
                });
    }

    private double calculateWeightFactor(Double weight) {
        if (weight == null || weight <= 1.0) return 1.0;
        if (weight <= 5.0) return 1.2;
        if (weight <= 10.0) return 1.5;
        return 2.0;
    }

    private double calculateDimensionFactor(PackageDimensionsDTO dimensions) {
        if (dimensions == null) return 1.0;
        BigDecimal volume = dimensions.getLength()
                .multiply(dimensions.getWidth())
                .multiply(dimensions.getHeight());
        double vol = volume.doubleValue();
        if (vol <= 1000) return 1.0;
        if (vol <= 5000) return 1.1;
        if (vol <= 10000) return 1.3;
        return 1.5;
    }

    // =========================================================
    // CONVERSORES
    // =========================================================

    private ShippingAddressDTO convertToShippingAddressDTO(ShippingAddress address) {
        return ShippingAddressDTO.builder()
                .id(address.getId())
                .recipientName(address.getRecipientName())
                .phone(address.getPhone())
                .addressLine1(address.getAddressLine1())
                .addressLine2(address.getAddressLine2())
                .cityId(address.getCity() != null ? address.getCity().getId() : null)
                .cityName(address.getCity() != null ? address.getCity().getName() : null)
                .postalCodeId(address.getPostalCode() != null ? address.getPostalCode().getId() : null)
                .postalCode(address.getPostalCode() != null ? address.getPostalCode().getCode() : null)
                .isDefault(address.getIsDefault())
                .build();
    }

    private ShippingAddressSummaryDTO convertToShippingAddressSummaryDTO(ShippingAddress address) {
        return ShippingAddressSummaryDTO.builder()
                .id(address.getId())
                .recipientName(address.getRecipientName())
                .addressLine1(address.getAddressLine1())
                .cityName(address.getCity() != null ? address.getCity().getName() : null)
                .isDefault(address.getIsDefault())
                .ordersCount(address.getOrders().size())
                .build();
    }
}