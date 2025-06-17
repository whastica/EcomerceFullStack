package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.Promotion.*;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;

import java.util.List;

public interface PromotionService {
    // Gestión de Códigos Promocionales
    PromoCodeDTO createPromoCode(CreatePromoCodeDTO createPromoCodeDTO);
    PromoCodeDTO updatePromoCode(Long id, UpdatePromoCodeDTO updatePromoCodeDTO);
    PromoCodeDTO getPromoCodeById(Long id);
    PageResponseDTO<PromoCodeSummaryDTO> searchPromoCodes(PromoCodeSearchDTO searchDTO);
    void deletePromoCode(Long id);
    
    // Validación y Aplicación de Promociones
    PromoCodeValidationResultDTO validatePromoCode(PromoCodeValidationDTO validationDTO);
    PromoCodeApplicationResultDTO applyPromoCode(ApplyPromoCodeDTO applyPromoCodeDTO);
    
    // Historial y Estadísticas
    List<UserPromoCodeHistoryDTO> getUserPromoCodeHistory(Long userId);
    PromoCodeStatsDTO getPromoCodeStats();
    
    // Operaciones en Lote
    BulkPromoCodeActionResultDTO bulkCreatePromoCodes(BulkPromoCodeActionDTO bulkActionDTO);
    BulkPromoCodeActionResultDTO bulkUpdatePromoCodes(BulkPromoCodeActionDTO bulkActionDTO);
    BulkPromoCodeActionResultDTO bulkDeletePromoCodes(BulkPromoCodeActionDTO bulkActionDTO);
} 