package com.whalensoft.astrosetupsback.application.dto.Promotion;

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
    private String action;
    private Integer totalCodes;
    private Integer successfulActions;
    private Integer failedActions;
    private List<String> successfulCodes;
    private Map<String, String> failedCodes; // código -> razón del fallo
    private String message;
}
