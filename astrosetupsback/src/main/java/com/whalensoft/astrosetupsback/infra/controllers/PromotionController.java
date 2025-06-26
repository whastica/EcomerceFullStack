package com.whalensoft.astrosetupsback.infra.controllers;

import java.util.List;

import com.whalensoft.astrosetupsback.application.dto.promotion.*;
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
import com.whalensoft.astrosetupsback.application.interfaces.PromotionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {
    private final PromotionService promotionService;

    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    // --- Códigos Promocionales ---
    @PostMapping("/codes")
    public ResponseEntity<PromoCodeDTO> createPromoCode(@Valid @RequestBody CreatePromoCodeDTO dto) {
        return ResponseEntity.ok(promotionService.createPromoCode(dto));
    }

    @PutMapping("/codes/{code}")
    public ResponseEntity<PromoCodeDTO> updatePromoCode(@PathVariable String code, @Valid @RequestBody UpdatePromoCodeDTO dto) {
        return ResponseEntity.ok(promotionService.updatePromoCode(code, dto));
    }

    @GetMapping("/codes/{code}")
    public ResponseEntity<PromoCodeDTO> getPromoCodeByCode(@PathVariable String code) {
        return ResponseEntity.ok(promotionService.getPromoCodeByCode(code));
    }

    @PostMapping("/codes/search")
    public ResponseEntity<PageResponseDTO<PromoCodeSummaryDTO>> searchPromoCodes(@RequestBody PromoCodeSearchDTO searchDTO) {
        return ResponseEntity.ok(promotionService.searchPromoCodes(searchDTO));
    }

    @DeleteMapping("/codes/{code}")
    public ResponseEntity<Void> deletePromoCode(@PathVariable String code) {
        promotionService.deletePromoCode(code);
        return ResponseEntity.noContent().build();
    }

    // --- Validación y Aplicación de Promociones ---
    @PostMapping("/codes/validate")
    public ResponseEntity<PromoCodeValidationResultDTO> validatePromoCode(@RequestBody PromoCodeValidationDTO dto) {
        return ResponseEntity.ok(promotionService.validatePromoCode(dto));
    }

    @PostMapping("/codes/apply")
    public ResponseEntity<PromoCodeApplicationResultDTO> applyPromoCode(@RequestBody ApplyPromoCodeDTO dto) {
        return ResponseEntity.ok(promotionService.applyPromoCode(dto));
    }

    // --- Historial y Estadísticas ---
    @GetMapping("/codes/history/{userId}")
    public ResponseEntity<List<UserPromoCodeHistoryDTO>> getUserPromoCodeHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(promotionService.getUserPromoCodeHistory(userId));
    }

    @GetMapping("/codes/stats")
    public ResponseEntity<PromoCodeStatsDTO> getPromoCodeStats() {
        return ResponseEntity.ok(promotionService.getPromoCodeStats());
    }

    // --- Operaciones en Lote ---
    @PostMapping("/codes/bulk-create")
    public ResponseEntity<BulkPromoCodeActionResultDTO> bulkCreatePromoCodes(@RequestBody BulkCreatePromoCodeDTO dto) {
        return ResponseEntity.ok(promotionService.bulkCreatePromoCodes(dto));
    }

    @PostMapping("/codes/bulk-update")
    public ResponseEntity<BulkPromoCodeActionResultDTO> bulkUpdatePromoCodes(@RequestBody BulkPromoCodeActionDTO dto) {
        return ResponseEntity.ok(promotionService.bulkUpdatePromoCodes(dto));
    }

    @PostMapping("/codes/bulk-delete")
    public ResponseEntity<BulkPromoCodeActionResultDTO> bulkDeletePromoCodes(@RequestBody BulkPromoCodeActionDTO dto) {
        return ResponseEntity.ok(promotionService.bulkDeletePromoCodes(dto));
    }
}
