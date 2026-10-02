package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Stats.CustomerStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Stats.CustomerStatusCountDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.ChangePasswordDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.CreateUserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UpdateUserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UserAdminDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UserAdminProfileDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UserSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CustomerService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final UserRepository userRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final CityRepository cityRepository;
    private final PasswordEncoder passwordEncoder;

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

    // =========================================================
    // GESTIÓN DE USUARIOS
    // =========================================================

    @Override
    public UserAdminDTO createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new RuntimeException(ErrorMessages.EMAIL_ALREADY_EXISTS);
        }

        User user = User.builder()
                .firstName(createUserDTO.getFirstName())
                .lastName(createUserDTO.getLastName())
                .email(createUserDTO.getEmail())
                .phone(createUserDTO.getPhone())
                .passwordHash(passwordEncoder.encode(createUserDTO.getPassword()))
                .role(UserRole.CLIENT)
                .status(UserStatus.ACTIVE)
                .verified(false)
                .createdAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);
        return convertToUserAdminDTO(savedUser);
    }

    @Override
    public UserAdminDTO updateUser(Long id, UpdateUserDTO updateUserDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));

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
        if (updateUserDTO.getStatus() != null) {
            if (updateUserDTO.getStatus() == UserStatus.DELETED && user.getRole() != UserRole.CLIENT) {
                throw new RuntimeException("Solo se pueden eliminar usuarios con rol CLIENT");
            }
            user.setStatus(updateUserDTO.getStatus());
        }
        if (updateUserDTO.getVerified() != null) {
            user.setVerified(updateUserDTO.getVerified());
        }

        User updatedUser = userRepository.save(user);
        return convertToUserAdminDTO(updatedUser);
    }

    @Override
    public UserAdminDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));
        return convertToUserAdminDTO(user);
    }

    @Override
    public PageResponseDTO<UserAdminDTO> searchUsers(UserSearchDTO searchDTO) {
        int page = searchDTO.getPage() != null ? Math.max(searchDTO.getPage(), 0) : 0;
        int size = searchDTO.getSize() != null ? Math.min(Math.max(searchDTO.getSize(), 1), 100) : 20;

        String sortField = switch (searchDTO.getSortBy() != null ? searchDTO.getSortBy() : "") {
            case "firstName", "lastName", "email", "role", "status", "verified", "createdAt" ->
                    searchDTO.getSortBy();
            default -> "createdAt";
        };
        Sort.Direction direction = "ASC".equalsIgnoreCase(searchDTO.getSortDirection())
                ? Sort.Direction.ASC : Sort.Direction.DESC;

        Page<User> result = userRepository.searchUsers(
                searchDTO.getSearchTerm(),
                searchDTO.getRole(),
                searchDTO.getStatus(),
                searchDTO.getVerified(),
                PageRequest.of(page, size, Sort.by(direction, sortField))
        );

        return PageResponseDTO.<UserAdminDTO>builder()
                .content(result.getContent().stream()
                        .map(this::convertToUserAdminDTO)
                        .collect(Collectors.toList()))
                .currentPage(result.getNumber())
                .totalPages(result.getTotalPages())
                .totalElements(result.getTotalElements())
                .size(result.getSize())
                .first(result.isFirst())
                .last(result.isLast())
                .empty(result.isEmpty())
                .numberOfElements(result.getNumberOfElements())
                .build();
    }

    @Override
    public UserAdminProfileDTO getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));

        return UserAdminProfileDTO.builder()
                .id(user.getId())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .status(user.getStatus())
                .verified(user.getVerified())
                .createdAt(user.getCreatedAt())
                .totalOrders(user.getOrders().size())
                .pendingOrders((int) user.getOrders().stream()
                        .filter(order -> order.getStatus() == OrderStatus.PENDING)
                        .count())
                .totalSpent(user.getOrders().stream()
                        .mapToDouble(Order::getTotal)
                        .sum())
                .lastOrderDate(user.getOrders().stream()
                        .map(Order::getOrderDate)
                        .max(LocalDateTime::compareTo)
                        .orElse(null))
                .hasActiveOrders(user.getOrders().stream()
                        .anyMatch(order -> order.getStatus() == OrderStatus.PENDING))
                .build();
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));
        user.setStatus(UserStatus.DELETED);
        userRepository.save(user);
    }

    @Override
    public void changePassword(Long id, ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));

        if (!passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPasswordHash())) {
            throw new RuntimeException(ErrorMessages.INCORRECT_CURRENT_PASSWORD);
        }
        if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())) {
            throw new RuntimeException(ErrorMessages.PASSWORDS_DO_NOT_MATCH);
        }

        user.setPasswordHash(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
    }

    // =========================================================
    // GESTIÓN DE DIRECCIONES
    // =========================================================

    @Override
    public ShippingAddressDTO createShippingAddress(
            Long userId, CreateShippingAddressDTO createAddressDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));

        City city = cityRepository.findById(createAddressDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));

        State state = city.getState();
        Country country = state.getCountry();

        ShippingAddress shippingAddress = ShippingAddress.builder()
                .user(user)
                .country(country)
                .state(state)
                .city(city)
                .addressLine1(createAddressDTO.getAddress())
                .recipientName(createAddressDTO.getRecipientName())
                .phone(createAddressDTO.getPhone())
                .isDefault(Boolean.TRUE.equals(createAddressDTO.getSetAsDefault()))
                .build();

        if (createAddressDTO.getPostalCodeId() != null) {
            // PostalCode lookup would need a repository; for now skip if not provided
        }

        ShippingAddress savedAddress = shippingAddressRepository.save(shippingAddress);
        return convertToShippingAddressDTO(savedAddress);
    }

    @Override
    public ShippingAddressDTO updateShippingAddress(
            Long userId, Long addressId, UpdateShippingAddressDTO updateAddressDTO) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.SHIPPING_ADDRESS_NOT_FOUND));

        if (!shippingAddress.getUser().getId().equals(userId)) {
            throw new RuntimeException(ErrorMessages.ADDRESS_DOES_NOT_BELONG_TO_USER);
        }

        if (updateAddressDTO.getAddress() != null) {
            shippingAddress.setAddressLine1(updateAddressDTO.getAddress());
        }
        if (updateAddressDTO.getRecipientName() != null) {
            shippingAddress.setRecipientName(updateAddressDTO.getRecipientName());
        }
        if (updateAddressDTO.getPhone() != null) {
            shippingAddress.setPhone(updateAddressDTO.getPhone());
        }
        if (updateAddressDTO.getCityId() != null) {
            City city = cityRepository.findById(updateAddressDTO.getCityId())
                    .orElseThrow(() -> new RuntimeException("Ciudad no encontrada"));
            shippingAddress.setCity(city);
            shippingAddress.setState(city.getState());
            shippingAddress.setCountry(city.getState().getCountry());
        }
        if (updateAddressDTO.getSetAsDefault() != null) {
            shippingAddress.setIsDefault(updateAddressDTO.getSetAsDefault());
        }

        ShippingAddress updatedAddress = shippingAddressRepository.save(shippingAddress);
        return convertToShippingAddressDTO(updatedAddress);
    }

    @Override
    public void deleteShippingAddress(Long userId, Long addressId) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.SHIPPING_ADDRESS_NOT_FOUND));

        if (!shippingAddress.getUser().getId().equals(userId)) {
            throw new RuntimeException(ErrorMessages.ADDRESS_DOES_NOT_BELONG_TO_USER);
        }

        shippingAddressRepository.deleteById(addressId);
    }

    @Override
    public List<ShippingAddressDTO> getUserShippingAddresses(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));
        return user.getShippingAddresses().stream()
                .map(this::convertToShippingAddressDTO)
                .toList();
    }

    // =========================================================
    // ESTADÍSTICAS
    // =========================================================

    @Override
    public CustomerStatsDTO getCustomerStats() {
        List<User> allUsers = userRepository.findAll(Pageable.unpaged()).getContent();
        List<User> users = allUsers.stream()
                .filter(u -> u.getStatus() != UserStatus.DELETED)
                .toList();

        long active = users.stream().filter(u -> u.getStatus() == UserStatus.ACTIVE).count();
        long inactive = users.stream().filter(u -> u.getStatus() == UserStatus.INACTIVE).count();
        long suspended = users.stream().filter(u -> u.getStatus() == UserStatus.SUSPENDED).count();
        long verified = users.stream().filter(User::getVerified).count();

        LocalDateTime monthStart = LocalDateTime.now().with(TemporalAdjusters.firstDayOfMonth())
                .toLocalDate().atStartOfDay();
        long newThisMonth = users.stream()
                .filter(u -> u.getCreatedAt() != null && !u.getCreatedAt().isBefore(monthStart))
                .count();

        long totalOrders = users.stream().mapToLong(u -> u.getOrders().size()).sum();
        long totalAddresses = users.stream().mapToLong(u -> u.getShippingAddresses().size()).sum();

        Map<UserStatus, Long> byStatus = new EnumMap<>(UserStatus.class);
        for (User u : users) {
            byStatus.merge(u.getStatus(), 1L, Long::sum);
        }
        List<CustomerStatusCountDTO> customersByStatus = byStatus.entrySet().stream()
                .map(e -> CustomerStatusCountDTO.builder()
                        .status(e.getKey().name())
                        .count(e.getValue())
                        .build())
                .collect(Collectors.toList());

        return CustomerStatsDTO.builder()
                .totalCustomers((long) users.size())
                .activeCustomers(active)
                .inactiveCustomers(inactive + suspended)
                .verifiedCustomers(verified)
                .unverifiedCustomers(users.size() - verified)
                .newCustomersThisMonth(newThisMonth)
                .customersByStatus(customersByStatus)
                .avgOrdersPerCustomer(users.isEmpty() ? 0.0
                        : Math.round((double) totalOrders / users.size() * 10.0) / 10.0)
                .totalShippingAddresses(totalAddresses)
                .build();
    }

    // =========================================================
    // CONVERSORES
    // =========================================================

    private UserAdminDTO convertToUserAdminDTO(User user) {
        return UserAdminDTO.builder()
                .id(user.getId())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .verified(user.getVerified())
                .createdAt(user.getCreatedAt())
                .totalOrders(user.getOrders().size())
                .activeShippingAddresses((int) user.getShippingAddresses().stream()
                        .filter(ShippingAddress::getIsDefault)
                        .count())
                .build();
    }

    private ShippingAddressDTO convertToShippingAddressDTO(ShippingAddress address) {
        return ShippingAddressDTO.builder()
                .id(address.getId())
                .addressLine1(address.getAddressLine1())
                .addressLine2(address.getAddressLine2())
                .cityId(address.getCity() != null ? address.getCity().getId() : null)
                .cityName(address.getCity() != null ? address.getCity().getName() : null)
                .postalCodeId(address.getPostalCode() != null ? address.getPostalCode().getId() : null)
                .postalCode(address.getPostalCode() != null ? address.getPostalCode().getCode() : null)
                .isDefault(address.getIsDefault())
                .build();
    }
}