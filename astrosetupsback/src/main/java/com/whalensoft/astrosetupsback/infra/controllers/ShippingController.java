package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.infra.exceptions.AccessDeniedException;
import com.whalensoft.astrosetupsback.infra.security.SecurityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whalensoft.astrosetupsback.application.dto.shipping.location.CitySummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.CreateShippingAddressDTO;

import com.whalensoft.astrosetupsback.application.dto.shipping.location.PostalCodeSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.cost.ShippingCostCalculationDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.cost.ShippingCostResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.stats.ShippingStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.zone.ShippingZoneDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.preferences.UserShippingPreferencesDTO;
import com.whalensoft.astrosetupsback.application.interfaces.ShippingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/shipping")
public class ShippingController {
    private final ShippingService shippingService;

    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    // --- Direcciones de Envío ---
    @PostMapping("/addresses")
    public ResponseEntity<ShippingAddressDTO> createShippingAddress(@Valid @RequestBody CreateShippingAddressDTO dto) {
        return ResponseEntity.ok(shippingService.createShippingAddress(dto));
    }

    @PutMapping("/addresses/{id}")
    public ResponseEntity<ShippingAddressDTO> updateShippingAddress(@PathVariable Long id, @Valid @RequestBody UpdateShippingAddressDTO dto) {
        checkAddressOwnership(id);
        return ResponseEntity.ok(shippingService.updateShippingAddress(id, dto));
    }

    @GetMapping("/addresses/{id}")
    public ResponseEntity<ShippingAddressDTO> getShippingAddressById(@PathVariable Long id) {
        checkAddressOwnership(id);
        return ResponseEntity.ok(shippingService.getShippingAddressById(id));
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<ShippingAddressSummaryDTO>> getAllShippingAddresses() {
        return ResponseEntity.ok(shippingService.getAllShippingAddresses());
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable Long id) {
        checkAddressOwnership(id);
        shippingService.deleteShippingAddress(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cities")
    public ResponseEntity<List<CitySummaryDTO>> getAllCities() {
        return ResponseEntity.ok(shippingService.getAllCities());
    }

    @GetMapping("/postal-codes/city/{cityId}")
    public ResponseEntity<List<PostalCodeSummaryDTO>> getPostalCodesByCity(@PathVariable Long cityId) {
        return ResponseEntity.ok(shippingService.getPostalCodesByCity(cityId));
    }

    // --- Cálculo de Costos de Envío ---
    @PostMapping("/cost/calculate")
    public ResponseEntity<ShippingCostResponseDTO> calculateShippingCost(@RequestBody ShippingCostCalculationDTO dto) {
        return ResponseEntity.ok(shippingService.calculateShippingCost(dto));
    }

    // --- Zonas de Envío ---
    @GetMapping("/zones")
    public ResponseEntity<List<ShippingZoneDTO>> getAllShippingZones() {
        return ResponseEntity.ok(shippingService.getAllShippingZones());
    }

    // --- Preferencias de Usuario ---
    @GetMapping("/preferences/{userId}")
    public ResponseEntity<UserShippingPreferencesDTO> getUserShippingPreferences(@PathVariable Long userId) {
        checkOwnership(userId);
        return ResponseEntity.ok(shippingService.getUserShippingPreferences(userId));
    }

    @PutMapping("/preferences/{userId}")
    public ResponseEntity<Void> updateUserShippingPreferences(@PathVariable Long userId, @RequestBody UserShippingPreferencesDTO dto) {
        checkOwnership(userId);
        shippingService.updateUserShippingPreferences(userId, dto);
        return ResponseEntity.noContent().build();
    }

    // --- Estadísticas de Envíos ---
    @GetMapping("/stats")
    public ResponseEntity<ShippingStatsDTO> getShippingStats() {
        return ResponseEntity.ok(shippingService.getShippingStats());
    }

    private void checkAddressOwnership(Long addressId) {
        if (!SecurityUtils.isAdmin()) {
            Long addressUserId = shippingService.getShippingAddressUserId(addressId);
            if (!addressUserId.equals(SecurityUtils.getCurrentUserId())) {
                throw new AccessDeniedException(ErrorMessages.FORBIDDEN);
            }
        }
    }

    private void checkOwnership(Long resourceUserId) {
        if (!SecurityUtils.isAdmin() && !resourceUserId.equals(SecurityUtils.getCurrentUserId())) {
            throw new AccessDeniedException(ErrorMessages.FORBIDDEN);
        }
    }
}
