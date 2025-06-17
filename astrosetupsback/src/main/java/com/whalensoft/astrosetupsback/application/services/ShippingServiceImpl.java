package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.DTO.shipping.*;
import com.whalensoft.astrosetupsback.application.interfaces.ShippingService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final ShippingAddressRepository shippingAddressRepository;
    private final CityRepository cityRepository;
    private final PostalCodeRepository postalCodeRepository;
    private final UserRepository userRepository;

    @Autowired
    public ShippingServiceImpl(
            ShippingAddressRepository shippingAddressRepository,
            CityRepository cityRepository,
            PostalCodeRepository postalCodeRepository,
            UserRepository userRepository) {
        this.shippingAddressRepository = shippingAddressRepository;
        this.cityRepository = cityRepository;
        this.postalCodeRepository = postalCodeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ShippingAddressDTO createShippingAddress(CreateShippingAddressDTO createAddressDTO) {
        // Validar datos de entrada
        validateCreateShippingAddressData(createAddressDTO);
        
        // Obtener usuario
        User user = userRepository.findById(createAddressDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Obtener ciudad
        City city = cityRepository.findById(createAddressDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        
        // Obtener código postal si se proporciona
        PostalCode postalCode = null;
        if (createAddressDTO.getPostalCodeId() != null) {
            postalCode = postalCodeRepository.findById(createAddressDTO.getPostalCodeId())
                    .orElseThrow(() -> new RuntimeException("Código postal no encontrado"));
        }
        
        // Si esta dirección será la predeterminada, desmarcar las otras
        if (Boolean.TRUE.equals(createAddressDTO.getIsDefault())) {
            setOtherAddressesAsNonDefault(user);
        }
        
        // Crear la dirección de envío
        ShippingAddress shippingAddress = ShippingAddress.builder()
                .user(user)
                .address(createAddressDTO.getAddress())
                .city(city)
                .postalCode(postalCode)
                .isDefault(createAddressDTO.getIsDefault() != null ? createAddressDTO.getIsDefault() : false)
                .build();
        
        ShippingAddress savedAddress = shippingAddressRepository.save(shippingAddress);
        
        return convertToShippingAddressDTO(savedAddress);
    }

    @Override
    public ShippingAddressDTO updateShippingAddress(Long id, UpdateShippingAddressDTO updateAddressDTO) {
        // Validar datos de entrada
        validateUpdateShippingAddressData(updateAddressDTO);
        
        // Obtener dirección existente
        ShippingAddress existingAddress = shippingAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));
        
        // Obtener ciudad
        City city = cityRepository.findById(updateAddressDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        
        // Obtener código postal si se proporciona
        PostalCode postalCode = null;
        if (updateAddressDTO.getPostalCodeId() != null) {
            postalCode = postalCodeRepository.findById(updateAddressDTO.getPostalCodeId())
                    .orElseThrow(() -> new RuntimeException("Código postal no encontrado"));
        }
        
        // Si esta dirección será la predeterminada, desmarcar las otras
        if (Boolean.TRUE.equals(updateAddressDTO.getIsDefault())) {
            setOtherAddressesAsNonDefault(existingAddress.getUser());
        }
        
        // Actualizar la dirección
        existingAddress.setAddress(updateAddressDTO.getAddress());
        existingAddress.setCity(city);
        existingAddress.setPostalCode(postalCode);
        if (updateAddressDTO.getIsDefault() != null) {
            existingAddress.setIsDefault(updateAddressDTO.getIsDefault());
        }
        
        ShippingAddress updatedAddress = shippingAddressRepository.save(existingAddress);
        
        return convertToShippingAddressDTO(updatedAddress);
    }

    @Override
    public ShippingAddressDTO getShippingAddressById(Long id) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));
        
        return convertToShippingAddressDTO(shippingAddress);
    }

    @Override
    public List<ShippingAddressSummaryDTO> getAllShippingAddresses() {
        // Obtener todas las direcciones de envío
        // Nota: En un caso real, probablemente querrías paginar esto
        // Por ahora retornamos todas las direcciones
        List<ShippingAddress> addresses = shippingAddressRepository.findAll();
        
        return addresses.stream()
                .map(this::convertToShippingAddressSummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteShippingAddress(Long id) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));
        
        // Verificar si hay órdenes asociadas
        if (!shippingAddress.getOrders().isEmpty()) {
            throw new RuntimeException("No se puede eliminar la dirección porque tiene órdenes asociadas");
        }
        
        shippingAddressRepository.deleteById(id);
    }

    @Override
    public CityDTO createCity(CreateCityDTO createCityDTO) {
        validateCreateCityData(createCityDTO);
        
        // Verificar si ya existe una ciudad con ese nombre
        cityRepository.findByName(createCityDTO.getName()).ifPresent(city -> {
            throw new RuntimeException("Ya existe una ciudad con ese nombre");
        });
        
        City city = City.builder()
                .name(createCityDTO.getName())
                .build();
        City savedCity = cityRepository.save(city);
        return convertToCityDTO(savedCity);
    }

    @Override
    public CityDTO updateCity(Long id, UpdateCityDTO updateCityDTO) {
        validateUpdateCityData(updateCityDTO);
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        city.setName(updateCityDTO.getName());
        City updatedCity = cityRepository.save(city);
        return convertToCityDTO(updatedCity);
    }

    @Override
    public List<CitySummaryDTO> getAllCities() {
        List<City> cities = cityRepository.findAll();
        return cities.stream()
                .map(this::convertToCitySummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PostalCodeDTO createPostalCode(CreatePostalCodeDTO createPostalCodeDTO) {
        validateCreatePostalCodeData(createPostalCodeDTO);
        
        // Verificar si ya existe el código
        if (postalCodeRepository.existsByCode(createPostalCodeDTO.getCode())) {
            throw new RuntimeException("Ya existe un código postal con ese valor");
        }
        
        // Verificar que la ciudad existe (para validación)
        City city = cityRepository.findById(createPostalCodeDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        
        // Crear el código postal (sin relación directa con city en el modelo actual)
        PostalCode postalCode = PostalCode.builder()
                .code(createPostalCodeDTO.getCode())
                .build();
        
        PostalCode savedPostalCode = postalCodeRepository.save(postalCode);
        
        return convertToPostalCodeDTO(savedPostalCode);
    }

    @Override
    public PostalCodeDTO updatePostalCode(Long id, UpdatePostalCodeDTO updatePostalCodeDTO) {
        validateUpdatePostalCodeData(updatePostalCodeDTO);
        
        PostalCode postalCode = postalCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Código postal no encontrado"));
        
        // Verificar que la ciudad existe (para validación)
        City city = cityRepository.findById(updatePostalCodeDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        
        // Actualizar solo el código (no hay relación directa con city en el modelo actual)
        postalCode.setCode(updatePostalCodeDTO.getCode());
        
        PostalCode updatedPostalCode = postalCodeRepository.save(postalCode);
        
        return convertToPostalCodeDTO(updatedPostalCode);
    }
    
    @Override
    public List<PostalCodeSummaryDTO> getPostalCodesByCity(Long cityId) {
        City city = cityRepository.findById(cityId)
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
        
        // Buscar códigos postales a través de las direcciones de envío de esta ciudad
        List<ShippingAddress> addressesInCity = shippingAddressRepository.findByCity(city);
        
        // Extraer códigos postales únicos
        List<PostalCode> postalCodes = addressesInCity.stream()
                .map(ShippingAddress::getPostalCode)
                .filter(postalCode -> postalCode != null)
                .distinct()
                .collect(Collectors.toList());
        
        return postalCodes.stream()
                .map(this::convertToPostalCodeSummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ShippingCostResponseDTO calculateShippingCost(ShippingCostCalculationDTO calculationDTO) {
        validateShippingCostCalculationData(calculationDTO);
        
        // Obtener ciudad de destino
        City destinationCity = cityRepository.findById(calculationDTO.getDestinationCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad de destino no encontrada"));
        
        // Obtener código postal si se proporciona
        PostalCode postalCode = null;
        if (calculationDTO.getPostalCodeId() != null) {
            postalCode = postalCodeRepository.findById(calculationDTO.getPostalCodeId())
                    .orElseThrow(() -> new RuntimeException("Código postal no encontrado"));
        }
        
        // Calcular costo base basado en la zona
        double baseCost = calculateBaseShippingCost(destinationCity);
        
        // Aplicar factores adicionales
        double weightFactor = calculateWeightFactor(calculationDTO.getPackageWeight());
        double dimensionFactor = calculateDimensionFactor(calculationDTO.getDimensions());
        
        double estimatedCost = baseCost * weightFactor * dimensionFactor;
        
        // Calcular días de entrega estimados
        int estimatedDeliveryDays = calculateEstimatedDeliveryDays(destinationCity);
        
        // Determinar si el envío express está disponible
        boolean expressAvailable = isExpressAvailable(destinationCity);
        double expressCost = expressAvailable ? estimatedCost * 1.5 : 0.0;
        
        return ShippingCostResponseDTO.builder()
                .destinationCity(destinationCity.getName())
                .postalCode(postalCode != null ? postalCode.getCode() : null)
                .estimatedCost(Math.round(estimatedCost * 100.0) / 100.0) // Redondear a 2 decimales
                .estimatedDeliveryDays(estimatedDeliveryDays)
                .carrierName("Astro Setups Express")
                .availableServices(List.of("Estándar", "Express"))
                .expressAvailable(expressAvailable)
                .expressCost(Math.round(expressCost * 100.0) / 100.0)
                .build();
    }

    @Override
    public List<ShippingZoneDTO> getAllShippingZones() {
        // Por ahora retornamos zonas predefinidas
        // En un caso real, esto vendría de una base de datos
        return List.of(
            ShippingZoneDTO.builder()
                .id(1L)
                .zoneName("Zona Local")
                .cities(List.of())
                .baseCost(5.0)
                .deliveryDays(1)
                .expressAvailable(true)
                .build(),
            ShippingZoneDTO.builder()
                .id(2L)
                .zoneName("Zona Nacional")
                .cities(List.of())
                .baseCost(15.0)
                .deliveryDays(3)
                .expressAvailable(true)
                .build(),
            ShippingZoneDTO.builder()
                .id(3L)
                .zoneName("Zona Internacional")
                .cities(List.of())
                .baseCost(50.0)
                .deliveryDays(7)
                .expressAvailable(false)
                .build()
        );
    }

    @Override
    public UserShippingPreferencesDTO getUserShippingPreferences(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        List<ShippingAddress> userAddresses = shippingAddressRepository.findByUser(user);
        
        // Encontrar dirección predeterminada
        ShippingAddress defaultAddress = userAddresses.stream()
                .filter(ShippingAddress::getIsDefault)
                .findFirst()
                .orElse(null);
        
        // Encontrar ciudad más preferida (la que aparece más veces)
        String preferredCity = findPreferredCity(userAddresses);
        
        return UserShippingPreferencesDTO.builder()
                .userId(userId)
                .addresses(userAddresses.stream()
                        .map(this::convertToShippingAddressSummaryDTO)
                        .collect(Collectors.toList()))
                .defaultAddress(defaultAddress != null ? convertToShippingAddressSummaryDTO(defaultAddress) : null)
                .totalAddresses(userAddresses.size())
                .preferredCity(preferredCity)
                .build();
    }

    @Override
    public void updateUserShippingPreferences(Long userId, UserShippingPreferencesDTO preferencesDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Por ahora solo actualizamos la dirección predeterminada
        if (preferencesDTO.getDefaultAddress() != null) {
            // Marcar todas las direcciones como no predeterminadas
            setOtherAddressesAsNonDefault(user);
            
            // Marcar la dirección seleccionada como predeterminada
            ShippingAddress selectedAddress = shippingAddressRepository.findById(preferencesDTO.getDefaultAddress().getId())
                    .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
            
            selectedAddress.setIsDefault(true);
            shippingAddressRepository.save(selectedAddress);
        }
    }

    @Override
    public ShippingStatsDTO getShippingStats() {
        // Obtener estadísticas básicas
        List<ShippingAddress> allAddresses = shippingAddressRepository.findAll();
        List<City> allCities = cityRepository.findAll();
        
        // Contar direcciones activas (con órdenes)
        long activeAddresses = allAddresses.stream()
                .filter(address -> !address.getOrders().isEmpty())
                .count();
        
        // Encontrar ciudad más popular
        String mostPopularCity = findMostPopularCity(allAddresses);
        
        // Calcular costo promedio de envío (simulado)
        double averageShippingCost = calculateAverageShippingCost();
        
        return ShippingStatsDTO.builder()
                .totalShippingAddresses((long) allAddresses.size())
                .totalCities((long) allCities.size())
                .totalPostalCodes(calculateTotalPostalCodes())
                .activeShippingAddresses(activeAddresses)
                .mostPopularCity(mostPopularCity)
                .ordersWithShipping(calculateOrdersWithShipping())
                .averageShippingCost(averageShippingCost)
                .build();
    }

    // Métodos auxiliares privados

    private void validateCreateShippingAddressData(CreateShippingAddressDTO createAddressDTO) {
        if (createAddressDTO.getUserId() == null) {
            throw new RuntimeException("El ID del usuario es obligatorio");
        }
        
        if (createAddressDTO.getAddress() == null || createAddressDTO.getAddress().trim().isEmpty()) {
            throw new RuntimeException("La dirección es obligatoria");
        }
        
        if (createAddressDTO.getCityId() == null) {
            throw new RuntimeException("La ciudad es obligatoria");
        }
    }

    private void validateUpdateShippingAddressData(UpdateShippingAddressDTO updateAddressDTO) {
        if (updateAddressDTO.getAddress() == null || updateAddressDTO.getAddress().trim().isEmpty()) {
            throw new RuntimeException("La dirección es obligatoria");
        }
        
        if (updateAddressDTO.getCityId() == null) {
            throw new RuntimeException("La ciudad es obligatoria");
        }
    }

    private void setOtherAddressesAsNonDefault(User user) {
        List<ShippingAddress> userAddresses = shippingAddressRepository.findByUser(user);
        userAddresses.stream()
                .filter(ShippingAddress::getIsDefault)
                .forEach(address -> address.setIsDefault(false));
        
        // Guardar los cambios
        userAddresses.stream()
                .filter(address -> !address.getIsDefault())
                .forEach(shippingAddressRepository::save);
    }

    // Métodos de conversión

    private ShippingAddressDTO convertToShippingAddressDTO(ShippingAddress shippingAddress) {
        return ShippingAddressDTO.builder()
                .id(shippingAddress.getId())
                .userId(shippingAddress.getUser().getId())
                .userFullName(shippingAddress.getUser().getFullName())
                .address(shippingAddress.getAddress())
                .city(convertToCityDTO(shippingAddress.getCity()))
                .postalCode(shippingAddress.getPostalCode() != null ? convertToPostalCodeDTO(shippingAddress.getPostalCode()) : null)
                .isDefault(shippingAddress.getIsDefault())
                .ordersCount(shippingAddress.getOrders().size())
                .build();
    }

    private ShippingAddressSummaryDTO convertToShippingAddressSummaryDTO(ShippingAddress shippingAddress) {
        return ShippingAddressSummaryDTO.builder()
                .id(shippingAddress.getId())
                .address(shippingAddress.getAddress())
                .cityName(shippingAddress.getCity().getName())
                .postalCode(shippingAddress.getPostalCode() != null ? shippingAddress.getPostalCode().getCode() : null)
                .isDefault(shippingAddress.getIsDefault())
                .build();
    }

    private CityDTO convertToCityDTO(City city) {
        return CityDTO.builder()
                .id(city.getId())
                .name(city.getName())
                .build();
    }

    private PostalCodeDTO convertToPostalCodeDTO(PostalCode postalCode) {
        return PostalCodeDTO.builder()
                .id(postalCode.getId())
                .code(postalCode.getCode())
                .build();
    }

    // Métodos auxiliares de validación y conversión para ciudades y códigos postales
    private void validateCreateCityData(CreateCityDTO createCityDTO) {
        if (createCityDTO.getName() == null || createCityDTO.getName().trim().isEmpty()) {
            throw new RuntimeException("El nombre de la ciudad es obligatorio");
        }
    }

    private void validateUpdateCityData(UpdateCityDTO updateCityDTO) {
        if (updateCityDTO.getName() == null || updateCityDTO.getName().trim().isEmpty()) {
            throw new RuntimeException("El nombre de la ciudad es obligatorio");
        }
    }

    private void validateCreatePostalCodeData(CreatePostalCodeDTO createPostalCodeDTO) {
        if (createPostalCodeDTO.getCode() == null || createPostalCodeDTO.getCode().trim().isEmpty()) {
            throw new RuntimeException("El código postal es obligatorio");
        }
        if (createPostalCodeDTO.getCityId() == null) {
            throw new RuntimeException("La ciudad es obligatoria");
        }
    }

    private void validateUpdatePostalCodeData(UpdatePostalCodeDTO updatePostalCodeDTO) {
        if (updatePostalCodeDTO.getCode() == null || updatePostalCodeDTO.getCode().trim().isEmpty()) {
            throw new RuntimeException("El código postal es obligatorio");
        }
        if (updatePostalCodeDTO.getCityId() == null) {
            throw new RuntimeException("La ciudad es obligatoria");
        }
    }

    private CitySummaryDTO convertToCitySummaryDTO(City city) {
        return CitySummaryDTO.builder()
                .id(city.getId())
                .name(city.getName())
                .build();
    }

    private PostalCodeSummaryDTO convertToPostalCodeSummaryDTO(PostalCode postalCode) {
        return PostalCodeSummaryDTO.builder()
                .id(postalCode.getId())
                .code(postalCode.getCode())
                .build();
    }

    // Métodos auxiliares para cálculo de costos y estadísticas

    private void validateShippingCostCalculationData(ShippingCostCalculationDTO calculationDTO) {
        if (calculationDTO.getDestinationCityId() == null) {
            throw new RuntimeException("La ciudad de destino es obligatoria");
        }
        
        if (calculationDTO.getPackageWeight() == null || calculationDTO.getPackageWeight() <= 0) {
            throw new RuntimeException("El peso del paquete debe ser mayor a 0");
        }
        
        if (calculationDTO.getDimensions() == null) {
            throw new RuntimeException("Las dimensiones del paquete son obligatorias");
        }
    }

    private double calculateBaseShippingCost(City destinationCity) {
        // Lógica simplificada: costo base por zona
        // En un caso real, esto vendría de una tabla de zonas de envío
        return 15.0; // Costo base nacional
    }

    private double calculateWeightFactor(Double weight) {
        // Factor basado en el peso: 1.0 para hasta 1kg, 1.2 para hasta 5kg, etc.
        if (weight <= 1.0) return 1.0;
        if (weight <= 5.0) return 1.2;
        if (weight <= 10.0) return 1.5;
        return 2.0; // Para paquetes muy pesados
    }

    private double calculateDimensionFactor(PackageDimensionsDTO dimensions) {
        // Factor basado en el volumen
        double volume = dimensions.getLength() * dimensions.getWidth() * dimensions.getHeight();
        if (volume <= 1000) return 1.0; // Hasta 1 litro
        if (volume <= 5000) return 1.1; // Hasta 5 litros
        if (volume <= 10000) return 1.3; // Hasta 10 litros
        return 1.5; // Para paquetes muy grandes
    }

    private int calculateEstimatedDeliveryDays(City destinationCity) {
        // Lógica simplificada: días de entrega por zona
        return 3; // Entrega nacional estándar
    }

    private boolean isExpressAvailable(City destinationCity) {
        // Lógica simplificada: express disponible para todas las ciudades
        return true;
    }

    private String findPreferredCity(List<ShippingAddress> addresses) {
        if (addresses.isEmpty()) return null;
        
        return addresses.stream()
                .collect(Collectors.groupingBy(
                    address -> address.getCity().getName(),
                    Collectors.counting()
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }

    private String findMostPopularCity(List<ShippingAddress> allAddresses) {
        if (allAddresses.isEmpty()) return "N/A";
        
        return allAddresses.stream()
                .collect(Collectors.groupingBy(
                    address -> address.getCity().getName(),
                    Collectors.counting()
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }

    private long calculateTotalPostalCodes() {
        // Por ahora retornamos un valor simulado
        // En un caso real, esto vendría de una consulta a la base de datos
        return 1000L;
    }

    private long calculateOrdersWithShipping() {
        // Por ahora retornamos un valor simulado
        // En un caso real, esto vendría de una consulta a la base de datos
        return 500L;
    }

    private double calculateAverageShippingCost() {
        // Por ahora retornamos un valor simulado
        // En un caso real, esto vendría de una consulta a la base de datos
        return 25.0;
    }
}