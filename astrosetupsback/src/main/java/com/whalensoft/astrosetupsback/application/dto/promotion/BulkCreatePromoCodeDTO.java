package com.whalensoft.astrosetupsback.application.dto.promotion;

import jakarta.validation.constraints.NotEmpty;
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
    private List<CreatePromoCodeDTO> promoCodes;
}