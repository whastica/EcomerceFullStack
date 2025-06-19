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

import com.whalensoft.astrosetupsback.application.dto.promotion.ApplyPromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.BulkPromoCodeActionDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.BulkPromoCodeActionResultDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.CreatePromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeApplicationResultDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeValidationDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.PromoCodeValidationResultDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.UpdatePromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.UserPromoCodeHistoryDTO;
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

    @PutMapping("/codes/{id}")
    public ResponseEntity<PromoCodeDTO> updatePromoCode(@PathVariable Long id, @Valid @RequestBody UpdatePromoCodeDTO dto) {
        return ResponseEntity.ok(promotionService.updatePromoCode(id, dto));
    }

    @GetMapping("/codes/{id}")
    public ResponseEntity<PromoCodeDTO> getPromoCodeById(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.getPromoCodeById(id));
    }

    @PostMapping("/codes/search")
    public ResponseEntity<PageResponseDTO<PromoCodeSummaryDTO>> searchPromoCodes(@RequestBody PromoCodeSearchDTO searchDTO) {
        return ResponseEntity.ok(promotionService.searchPromoCodes(searchDTO));
    }

    @DeleteMapping("/codes/{id}")
    public ResponseEntity<Void> deletePromoCode(@PathVariable Long id) {
        promotionService.deletePromoCode(id);
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
    public ResponseEntity<BulkPromoCodeActionResultDTO> bulkCreatePromoCodes(@RequestBody BulkPromoCodeActionDTO dto) {
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
