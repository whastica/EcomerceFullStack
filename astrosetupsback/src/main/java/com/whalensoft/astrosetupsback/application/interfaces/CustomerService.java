package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.customer.Address.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UserShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Stats.CustomerStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.*;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;

import java.util.List;

public interface CustomerService {

    // Gestión de Usuarios
    UserAdminDTO createUser(CreateUserDTO createUserDTO);
    UserAdminDTO updateUser(Long id, UpdateUserDTO updateUserDTO);
    UserAdminDTO getUserById(Long id);
    UserAdminProfileDTO getUserProfile(Long id);
    void deleteUser(Long id);
    void changePassword(Long id, ChangePasswordDTO changePasswordDTO);

    // Gestión de Direcciones
    ShippingAddressDTO createShippingAddress(Long userId, CreateShippingAddressDTO createAddressDTO);
    ShippingAddressDTO updateShippingAddress(Long userId, Long addressId, UpdateShippingAddressDTO updateAddressDTO);
    void deleteShippingAddress(Long userId, Long addressId);
    List<ShippingAddressDTO> getUserShippingAddresses(Long userId);

    // Estadísticas de Clientes
    CustomerStatsDTO getCustomerStats();
}