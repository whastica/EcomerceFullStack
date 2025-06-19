package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.ChangePasswordDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.CityDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.CreateCityDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.CreateUserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.CustomerStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UpdateUserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UserDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UserProfileDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UserSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UserShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.UserSummaryDTO;
import com.whalensoft.astrosetupsback.application.interfaces.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // --- Usuarios ---
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserDTO dto) {
        return ResponseEntity.ok(customerService.createUser(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserDTO dto) {
        return ResponseEntity.ok(customerService.updateUser(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getUserById(id));
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getUserProfile(id));
    }

    @PostMapping("/search")
    public ResponseEntity<PageResponseDTO<UserSummaryDTO>> searchUsers(@RequestBody UserSearchDTO searchDTO) {
        return ResponseEntity.ok(customerService.searchUsers(searchDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        customerService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<Void> changePassword(@PathVariable Long id, @Valid @RequestBody ChangePasswordDTO dto) {
        customerService.changePassword(id, dto);
        return ResponseEntity.noContent().build();
    }

    // --- Direcciones de Envío ---
    @PostMapping("/{userId}/shipping-addresses")
    public ResponseEntity<UserShippingAddressDTO> createShippingAddress(@PathVariable Long userId, @Valid @RequestBody CreateShippingAddressDTO dto) {
        return ResponseEntity.ok(customerService.createShippingAddress(userId, dto));
    }

    @PutMapping("/{userId}/shipping-addresses/{addressId}")
    public ResponseEntity<UserShippingAddressDTO> updateShippingAddress(@PathVariable Long userId, @PathVariable Long addressId, @Valid @RequestBody UpdateShippingAddressDTO dto) {
        return ResponseEntity.ok(customerService.updateShippingAddress(userId, addressId, dto));
    }

    @DeleteMapping("/{userId}/shipping-addresses/{addressId}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        customerService.deleteShippingAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}/shipping-addresses")
    public ResponseEntity<List<UserShippingAddressDTO>> getUserShippingAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getUserShippingAddresses(userId));
    }

    // --- Ciudades ---
    @PostMapping("/cities")
    public ResponseEntity<CityDTO> createCity(@Valid @RequestBody CreateCityDTO dto) {
        return ResponseEntity.ok(customerService.createCity(dto));
    }

    @GetMapping("/cities")
    public ResponseEntity<List<CityDTO>> getAllCities() {
        return ResponseEntity.ok(customerService.getAllCities());
    }

    // --- Estadísticas de Clientes ---
    @GetMapping("/stats")
    public ResponseEntity<CustomerStatsDTO> getCustomerStats() {
        return ResponseEntity.ok(customerService.getCustomerStats());
    }
}
