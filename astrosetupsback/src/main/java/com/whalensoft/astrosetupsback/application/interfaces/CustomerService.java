package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.customer.*;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;

import java.util.List;

public interface CustomerService {
    // Gestión de Usuarios
    UserDTO createUser(CreateUserDTO createUserDTO);
    UserDTO updateUser(Long id, UpdateUserDTO updateUserDTO);
    UserDTO getUserById(Long id);
    UserProfileDTO getUserProfile(Long id);
    PageResponseDTO<UserSummaryDTO> searchUsers(UserSearchDTO searchDTO);
    void deleteUser(Long id);
    void changePassword(Long id, ChangePasswordDTO changePasswordDTO);
    
    // Gestión de Direcciones
    UserShippingAddressDTO createShippingAddress(Long userId, CreateShippingAddressDTO createAddressDTO);
    UserShippingAddressDTO updateShippingAddress(Long userId, Long addressId, UpdateShippingAddressDTO updateAddressDTO);
    void deleteShippingAddress(Long userId, Long addressId);
    List<UserShippingAddressDTO> getUserShippingAddresses(Long userId);
    
    // Gestión de Ciudades
    CityDTO createCity(CreateCityDTO createCityDTO);
    List<CityDTO> getAllCities();
    
    // Estadísticas de Clientes
    CustomerStatsDTO getCustomerStats();
} 