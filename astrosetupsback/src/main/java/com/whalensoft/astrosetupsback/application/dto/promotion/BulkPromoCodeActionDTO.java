package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkPromoCodeActionDTO {
    @NotEmpty(message = "La lista de códigos promocionales no puede estar vacía")
    private List<String> promoCodes;

    @NotBlank(message = "La acción es obligatoria")
    @Pattern(regexp = "^(ACTIVATE|DEACTIVATE|DELETE)$",
            message = "La acción debe ser ACTIVATE, DEACTIVATE o DELETE")
    private String action;
}
