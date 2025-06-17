package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.dto.customer.*;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CustomerService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final UserRepository userRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final CityRepository cityRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CustomerServiceImpl(
            UserRepository userRepository,
            ShippingAddressRepository shippingAddressRepository,
            CityRepository cityRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.shippingAddressRepository = shippingAddressRepository;
        this.cityRepository = cityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = User.builder()
                .firstName(createUserDTO.getFirstName())
                .lastName(createUserDTO.getLastName())
                .email(createUserDTO.getEmail())
                .phone(createUserDTO.getPhone())
                .address(createUserDTO.getAddress())
                .passwordHash(passwordEncoder.encode(createUserDTO.getPassword()))
                .role(UserRole.CLIENT)
                .status(UserStatus.ACTIVE)
                .verified(false)
                .createdAt(LocalDateTime.now())
                .build();

        if (createUserDTO.getCityId() != null) {
            cityRepository.findById(createUserDTO.getCityId())
                    .ifPresent(user::setCity);
        }

        User savedUser = userRepository.save(user);
        return convertToUserDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Long id, UpdateUserDTO updateUserDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (updateUserDTO.getFirstName() != null) {
            user.setFirstName(updateUserDTO.getFirstName());
        }
        if (updateUserDTO.getLastName() != null) {
            user.setLastName(updateUserDTO.getLastName());
        }
        if (updateUserDTO.getPhone() != null) {
            user.setPhone(updateUserDTO.getPhone());
        }
        if (updateUserDTO.getAddress() != null) {
            user.setAddress(updateUserDTO.getAddress());
        }
        if (updateUserDTO.getCityId() != null) {
            cityRepository.findById(updateUserDTO.getCityId())
                    .ifPresent(user::setCity);
        }

        User updatedUser = userRepository.save(user);
        return convertToUserDTO(updatedUser);
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return convertToUserDTO(user);
    }

    @Override
    public UserProfileDTO getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return UserProfileDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .status(user.getStatus())
                .verified(user.getVerified())
                .createdAt(user.getCreatedAt())
                .cityName(user.getCity() != null ? user.getCity().getName() : null)
                .postalCode(user.getPostalCode() != null ? user.getPostalCode().getCode() : null)
                .shippingAddresses(user.getShippingAddresses().stream()
                        .map(this::convertToUserShippingAddressDTO)
                        .toList())
                .totalOrders(user.getOrders().size())
                .pendingOrders((int) user.getOrders().stream()
                        .filter(order -> order.getStatus() == OrderStatus.PENDING)
                        .count())
                .totalSpent(user.getOrders().stream()
                        .mapToDouble(Order::getTotal)
                        .sum())
                .lastOrderDate(user.getOrders().stream()
                        .max((o1, o2) -> o1.getOrderDate().compareTo(o2.getOrderDate()))
                        .map(Order::getOrderDate)
                        .orElse(null))
                .fullName(user.getFirstName() + " " + user.getLastName())
                .hasActiveOrders(user.getOrders().stream()
                        .anyMatch(order -> order.getStatus() == OrderStatus.PENDING))
                .build();
    }

    @Override
    public PageResponseDTO<UserSummaryDTO> searchUsers(UserSearchDTO searchDTO) {
        Pageable pageable = PageRequest.of(
                searchDTO.getPage() != null ? searchDTO.getPage() : 0,
                searchDTO.getSize() != null ? searchDTO.getSize() : 10,
                Sort.by(Sort.Direction.fromString(
                        searchDTO.getSortDirection() != null ? searchDTO.getSortDirection() : "ASC"),
                        searchDTO.getSortBy() != null ? searchDTO.getSortBy() : "createdAt"
                )
        );

        Page<User> userPage = userRepository.findAll(pageable);
        
        List<UserSummaryDTO> userSummaries = userPage.getContent().stream()
                .map(this::convertToUserSummaryDTO)
                .toList();

        return PageResponseDTO.<UserSummaryDTO>builder()
                .content(userSummaries)
                .totalElements(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .currentPage(userPage.getNumber())
                .size(userPage.getSize())
                .first(userPage.isFirst())
                .last(userPage.isLast())
                .empty(userPage.isEmpty())
                .numberOfElements(userPage.getNumberOfElements())
                .build();
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setStatus(UserStatus.DELETED);
        userRepository.save(user);
    }

    @Override
    public void changePassword(Long id, ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPasswordHash())) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }

        if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())) {
            throw new RuntimeException("Las contraseñas no coinciden");
        }

        user.setPasswordHash(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public UserShippingAddressDTO createShippingAddress(Long userId, CreateShippingAddressDTO createAddressDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        ShippingAddress shippingAddress = ShippingAddress.builder()
                .user(user)
                .address(createAddressDTO.getAddress())
                .isDefault(false)
                .build();

        if (createAddressDTO.getCityId() != null) {
            cityRepository.findById(createAddressDTO.getCityId())
                    .ifPresent(shippingAddress::setCity);
        }

        ShippingAddress savedAddress = shippingAddressRepository.save(shippingAddress);
        return convertToUserShippingAddressDTO(savedAddress);
    }

    @Override
    public UserShippingAddressDTO updateShippingAddress(Long userId, Long addressId, UpdateShippingAddressDTO updateAddressDTO) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        if (!shippingAddress.getUser().getId().equals(userId)) {
            throw new RuntimeException("La dirección no pertenece al usuario");
        }

        if (updateAddressDTO.getAddress() != null) {
            shippingAddress.setAddress(updateAddressDTO.getAddress());
        }
        if (updateAddressDTO.getCityId() != null) {
            cityRepository.findById(updateAddressDTO.getCityId())
                    .ifPresent(shippingAddress::setCity);
        }

        ShippingAddress updatedAddress = shippingAddressRepository.save(shippingAddress);
        return convertToUserShippingAddressDTO(updatedAddress);
    }

    @Override
    public void deleteShippingAddress(Long userId, Long addressId) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        if (!shippingAddress.getUser().getId().equals(userId)) {
            throw new RuntimeException("La dirección no pertenece al usuario");
        }

        shippingAddressRepository.deleteById(addressId);
    }

    @Override
    public List<UserShippingAddressDTO> getUserShippingAddresses(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return user.getShippingAddresses().stream()
                .map(this::convertToUserShippingAddressDTO)
                .toList();
    }

    @Override
    public CityDTO createCity(CreateCityDTO createCityDTO) {
        City city = City.builder()
                .name(createCityDTO.getName())
                .build();

        City savedCity = cityRepository.save(city);
        return convertToCityDTO(savedCity);
    }

    @Override
    public List<CityDTO> getAllCities() {
        return cityRepository.findAll().stream()
                .map(this::convertToCityDTO)
                .toList();
    }

    @Override
    public CustomerStatsDTO getCustomerStats() {
        Page<User> userPage = userRepository.findAll(Pageable.unpaged());
        List<User> users = userPage.getContent();
        
        return CustomerStatsDTO.builder()
                .totalCustomers((long) users.size())
                .activeCustomers((long) users.stream()
                        .filter(user -> user.getStatus() == UserStatus.ACTIVE)
                        .count())
                .verifiedCustomers((long) users.stream()
                        .filter(User::getVerified)
                        .count())
                .customersByStatus(users.stream()
                        .collect(Collectors.groupingBy(
                                User::getStatus,
                                Collectors.counting()
                        )))
                .build();
    }

    // Métodos de conversión privados
    private UserDTO convertToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole())
                .status(user.getStatus())
                .verified(user.getVerified())
                .createdAt(user.getCreatedAt())
                .cityName(user.getCity() != null ? user.getCity().getName() : null)
                .postalCode(user.getPostalCode() != null ? user.getPostalCode().getCode() : null)
                .fullName(user.getFirstName() + " " + user.getLastName())
                .totalOrders(user.getOrders().size())
                .activeShippingAddresses((int) user.getShippingAddresses().stream()
                        .filter(ShippingAddress::getIsDefault)
                        .count())
                .build();
    }

    private UserSummaryDTO convertToUserSummaryDTO(User user) {
        return UserSummaryDTO.builder()
                .id(user.getId())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .verified(user.getVerified())
                .createdAt(user.getCreatedAt())
                .totalOrders(user.getOrders().size())
                .build();
    }

    private UserShippingAddressDTO convertToUserShippingAddressDTO(ShippingAddress shippingAddress) {
        return UserShippingAddressDTO.builder()
                .id(shippingAddress.getId())
                .address(shippingAddress.getAddress())
                .cityName(shippingAddress.getCity() != null ? shippingAddress.getCity().getName() : null)
                .postalCode(shippingAddress.getPostalCode() != null ? shippingAddress.getPostalCode().getCode() : null)
                .isDefault(shippingAddress.getIsDefault())
                .ordersCount(shippingAddress.getOrders().size())
                .build();
    }

    private CityDTO convertToCityDTO(City city) {
        return CityDTO.builder()
                .id(city.getId())
                .name(city.getName())
                .build();
    }
} 