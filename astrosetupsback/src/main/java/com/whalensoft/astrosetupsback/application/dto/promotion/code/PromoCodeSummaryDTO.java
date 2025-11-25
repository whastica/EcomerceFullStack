package com.whalensoft.astrosetupsback.application.dto.promotion.code;

import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoDiscountType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCodeSummaryDTO {

    private String code;

    // Nuevo: coherente con el diseño moderno de promociones
    private PromoDiscountType discountType;
    private Double discountValue;

    private LocalDateTime expirationDate;

    private Boolean active;

    // Métricas esenciales
    private Integer timesUsed;
    private Integer remainingUses;

    // Campo derivado muy útil en tablas
    private Boolean expired;
}