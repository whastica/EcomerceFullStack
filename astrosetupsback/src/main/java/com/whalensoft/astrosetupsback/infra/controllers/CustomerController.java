package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import com.whalensoft.astrosetupsback.application.dto.customer.Users.*;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
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
import com.whalensoft.astrosetupsback.application.dto.customer.Address.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Stats.CustomerStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.customer.Address.UserShippingAddressDTO;
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
        return ResponseEntity.ok(customerService.updateUser(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAdminDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getUserById(id));
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserAdminProfileDTO> getUserProfile(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getUserProfile(id));
    }

    //No es recomendable nunca borrar datos de usuraio lo mejor es desactivarlos
    /*@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        customerService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }*/

    @PutMapping("/{id}/password")
    public ResponseEntity<Void> changePassword(@PathVariable Long id, @Valid @RequestBody ChangePasswordDTO dto) {
        customerService.changePassword(id, dto);
        return ResponseEntity.noContent().build();
    }

    // --- Direcciones de Envío ---
    @PostMapping("/{userId}/shipping-addresses")
    public ResponseEntity<ShippingAddressDTO> createShippingAddress(@PathVariable Long userId, @Valid @RequestBody CreateShippingAddressDTO dto) {
        return ResponseEntity.ok(customerService.createShippingAddress(userId, dto));
    }

    @PutMapping("/{userId}/shipping-addresses/{addressId}")
    public ResponseEntity<ShippingAddressDTO> updateShippingAddress(@PathVariable Long userId, @PathVariable Long addressId, @Valid @RequestBody UpdateShippingAddressDTO dto) {
        return ResponseEntity.ok(customerService.updateShippingAddress(userId, addressId, dto));
    }

    //Hablar el manejor de estas eliminaciones
    @DeleteMapping("/{userId}/shipping-addresses/{addressId}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        customerService.deleteShippingAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}/shipping-addresses")
    public ResponseEntity<List<ShippingAddressDTO>> getUserShippingAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(customerService.getUserShippingAddresses(userId));
    }

    // --- Estadísticas de Clientes ---
    @GetMapping("/stats")
    public ResponseEntity<CustomerStatsDTO> getCustomerStats() {
        return ResponseEntity.ok(customerService.getCustomerStats());
    }
}
