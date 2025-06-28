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

import com.whalensoft.astrosetupsback.application.dto.shipping.CityDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.CitySummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.CreateCityDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.CreatePostalCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.CreateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.PostalCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.PostalCodeSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.ShippingAddressSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.ShippingCostCalculationDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.ShippingCostResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.ShippingStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.ShippingZoneDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.UpdateCityDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.UpdatePostalCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.UpdateShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.UserShippingPreferencesDTO;
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
        return ResponseEntity.ok(shippingService.updateShippingAddress(id, dto));
    }

    @GetMapping("/addresses/{id}")
    public ResponseEntity<ShippingAddressDTO> getShippingAddressById(@PathVariable Long id) {
        return ResponseEntity.ok(shippingService.getShippingAddressById(id));
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<ShippingAddressSummaryDTO>> getAllShippingAddresses() {
        return ResponseEntity.ok(shippingService.getAllShippingAddresses());
    }

    // Hay que hablar de este delete
    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable Long id) {
        shippingService.deleteShippingAddress(id);
        return ResponseEntity.noContent().build();
    }

    // --- Ciudades ---
    @PostMapping("/cities")
    public ResponseEntity<CityDTO> createCity(@Valid @RequestBody CreateCityDTO dto) {
        return ResponseEntity.ok(shippingService.createCity(dto));
    }

    @PutMapping("/cities/{id}")
    public ResponseEntity<CityDTO> updateCity(@PathVariable Long id, @Valid @RequestBody UpdateCityDTO dto) {
        return ResponseEntity.ok(shippingService.updateCity(id, dto));
    }

    @GetMapping("/cities")
    public ResponseEntity<List<CitySummaryDTO>> getAllCities() {
        return ResponseEntity.ok(shippingService.getAllCities());
    }

    // --- Códigos Postales ---
    @PostMapping("/postal-codes")
    public ResponseEntity<PostalCodeDTO> createPostalCode(@Valid @RequestBody CreatePostalCodeDTO dto) {
        return ResponseEntity.ok(shippingService.createPostalCode(dto));
    }

    @PutMapping("/postal-codes/{id}")
    public ResponseEntity<PostalCodeDTO> updatePostalCode(@PathVariable Long id, @Valid @RequestBody UpdatePostalCodeDTO dto) {
        return ResponseEntity.ok(shippingService.updatePostalCode(id, dto));
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
        return ResponseEntity.ok(shippingService.getUserShippingPreferences(userId));
    }

    @PutMapping("/preferences/{userId}")
    public ResponseEntity<Void> updateUserShippingPreferences(@PathVariable Long userId, @RequestBody UserShippingPreferencesDTO dto) {
        shippingService.updateUserShippingPreferences(userId, dto);
        return ResponseEntity.noContent().build();
    }

    // --- Estadísticas de Envíos ---
    @GetMapping("/stats")
    public ResponseEntity<ShippingStatsDTO> getShippingStats() {
        return ResponseEntity.ok(shippingService.getShippingStats());
    }
}
