package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.bullk.BulkCreatePromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.bullk.BulkPromoCodeActionDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.bullk.BulkPromoCodeActionResultDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.code.*;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.ApplyPromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationResultDTO;

import java.util.List;

public interface PromotionService {
    // Gestión de Códigos Promocionales
    PromoCodeDTO createPromoCode(CreatePromoCodeDTO createPromoCodeDTO);
    PromoCodeDTO updatePromoCode(String code, UpdatePromoCodeDTO updatePromoCodeDTO);
    PromoCodeDTO getPromoCodeByCode(String code);
    PageResponseDTO<PromoCodeSummaryDTO> searchPromoCodes(PromoCodeSearchDTO searchDTO);
    void deletePromoCode(String code);
    
    // Validación y Aplicación de Promociones
    PromoCodeValidationResultDTO validatePromoCode(PromoCodeValidationDTO validationDTO);
    PromoCodeApplicationResultDTO applyPromoCode(ApplyPromoCodeDTO applyPromoCodeDTO);
    
    // Historial y Estadísticas
    List<UserPromoCodeHistoryDTO> getUserPromoCodeHistory(Long userId);
    PromoCodeStatsDTO getPromoCodeStats();
    
    // Operaciones en Lote
    BulkPromoCodeActionResultDTO bulkCreatePromoCodes(BulkCreatePromoCodeDTO bulkCreateDTO);
    BulkPromoCodeActionResultDTO bulkUpdatePromoCodes(BulkPromoCodeActionDTO bulkActionDTO);
    BulkPromoCodeActionResultDTO bulkDeletePromoCodes(BulkPromoCodeActionDTO bulkActionDTO);
} 