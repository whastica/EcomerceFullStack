package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UserShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Stats.CustomerStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.ChangePasswordDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.CreateUserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UpdateUserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UserAdminDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.UserAdminProfileDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CustomerService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.*;
import org.springframework.data.domain.Pageable;
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
    private final PasswordEncoder passwordEncoder;

    public CustomerServiceImpl(
            UserRepository userRepository,
            ShippingAddressRepository shippingAddressRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.shippingAddressRepository = shippingAddressRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================================================
    // GESTIÓN DE USUARIOS
    // =========================================================

    @Override
    public UserAdminDTO createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new RuntimeException(ErrorMessages.USER_NOT_FOUND);
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

        ShippingAddress shippingAddress = ShippingAddress.builder()
                .user(user)
                .isDefault(false)
                .build();

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
        List<User> users = userRepository.findAll(Pageable.unpaged()).getContent();

        return CustomerStatsDTO.builder()
                .totalCustomers((long) users.size())
                .activeCustomers(users.stream()
                        .filter(user -> user.getStatus() == UserStatus.ACTIVE)
                        .count())
                .verifiedCustomers(users.stream()
                        .filter(User::getVerified)
                        .count())

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