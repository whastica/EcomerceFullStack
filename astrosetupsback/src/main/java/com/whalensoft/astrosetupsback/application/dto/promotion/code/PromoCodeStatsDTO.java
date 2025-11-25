package com.whalensoft.astrosetupsback.application.dto.promotion.code;

import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoDiscountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeStatsDTO {

    // Totales generales
    private Long totalPromoCodes;
    private Long activePromoCodes;
    private Long expiredPromoCodes;
    private Long disabledPromoCodes;

    // Uso
    private Long totalUniqueCodesUsed; // cuántos códigos se han usado al menos una vez
    private Long totalApplications; // cuántas veces se han aplicado en total

    // Descuentos otorgados
    private Double totalDiscountGiven;
    private Double averageDiscountValue; // ya no porcentaje → valor real promedio aplicado

    // Métricas por tipo de descuento
    private Map<PromoDiscountType, Long> promoCodesByType;
    private Map<PromoDiscountType, Double> totalDiscountGivenByType;

    // Principales códigos usados
    private List<PromoCodeUsageRankingDTO> topUsedCodes; // reemplaza el Map<String, Integer>

    // Otros datos importantes
    private Long promoCodesExpiringSoon; // próximos 30 días
    private LocalDateTime lastCodeCreated;
}