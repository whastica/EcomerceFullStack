package com.whalensoft.astrosetupsback.application.dto.promotion.bullk;

import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoCodeBulkAction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkPromoCodeActionResultDTO {

    private PromoCodeBulkAction action;

    private Integer totalCodes;
    private Integer successfulActions;
    private Integer failedActions;

    private List<String> successfulCodes;

    // código -> razón del fallo
    private Map<String, String> failedCodes;

    private String summary;
}