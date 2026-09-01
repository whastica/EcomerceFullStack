package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.customer.Users.*;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.infra.exceptions.AccessDeniedException;
import com.whalensoft.astrosetupsback.infra.security.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.whalensoft.astrosetupsback.application.dto.customer.Address.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Stats.CustomerStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UpdateShippingAddressDTO;
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
    public ResponseEntity<UserAdminDTO> createUser(@Valid @RequestBody CreateUserDTO dto) {
        return ResponseEntity.ok(customerService.createUser(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAdminDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserDTO dto) {
        checkOwnership(id);
        return ResponseEntity.ok(customerService.updateUser(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAdminDTO> getUserById(@PathVariable Long id) {
        checkOwnership(id);
        return ResponseEntity.ok(customerService.getUserById(id));
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserAdminProfileDTO> getUserProfile(@PathVariable Long id) {
        checkOwnership(id);
        return ResponseEntity.ok(customerService.getUserProfile(id));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<Void> changePassword(@PathVariable Long id, @Valid @RequestBody ChangePasswordDTO dto) {
        checkOwnership(id);
        customerService.changePassword(id, dto);
        return ResponseEntity.noContent().build();
    }

    // --- Direcciones de Envío ---
    @PostMapping("/{userId}/shipping-addresses")
    public ResponseEntity<ShippingAddressDTO> createShippingAddress(@PathVariable Long userId, @Valid @RequestBody CreateShippingAddressDTO dto) {
        checkOwnership(userId);
        return ResponseEntity.ok(customerService.createShippingAddress(userId, dto));
    }

    @PutMapping("/{userId}/shipping-addresses/{addressId}")
    public ResponseEntity<ShippingAddressDTO> updateShippingAddress(@PathVariable Long userId, @PathVariable Long addressId, @Valid @RequestBody UpdateShippingAddressDTO dto) {
        checkOwnership(userId);
        return ResponseEntity.ok(customerService.updateShippingAddress(userId, addressId, dto));
    }

    @DeleteMapping("/{userId}/shipping-addresses/{addressId}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        checkOwnership(userId);
        customerService.deleteShippingAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}/shipping-addresses")
    public ResponseEntity<List<ShippingAddressDTO>> getUserShippingAddresses(@PathVariable Long userId) {
        checkOwnership(userId);
        return ResponseEntity.ok(customerService.getUserShippingAddresses(userId));
    }

    // --- Estadísticas de Clientes ---
    @GetMapping("/stats")
    public ResponseEntity<CustomerStatsDTO> getCustomerStats() {
        return ResponseEntity.ok(customerService.getCustomerStats());
    }

    private void checkOwnership(Long resourceUserId) {
        if (!SecurityUtils.isAdmin() && !resourceUserId.equals(SecurityUtils.getCurrentUserId())) {
            throw new AccessDeniedException(ErrorMessages.FORBIDDEN);
        }
    }
}
