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
    @Size(max = 500, message = "Solo se permiten hasta 500 códigos por operación")
    private List<String> promoCodes;

    @NotNull(message = "La acción es obligatoria")
    private PromoCodeBulkAction action;

    @Size(max = 255, message = "El motivo no puede exceder 255 caracteres")
    private String reason; // opcional, para trazabilidad
}