package com.whalensoft.astrosetupsback.application.dto.promotion.bullk;

import com.whalensoft.astrosetupsback.application.dto.promotion.code.CreatePromoCodeDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkCreatePromoCodeDTO {

    @NotEmpty(message = "La lista de códigos promocionales no puede estar vacía")
    @Size(max = 500, message = "No se pueden crear más de 500 códigos por solicitud")
    @Valid
    private List<CreatePromoCodeDTO> promoCodes;
}