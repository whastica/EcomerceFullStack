package com.whalensoft.astrosetupsback.application.dto.sales.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartItemDTO {

    /** Cantidad final deseada para este ítem */
    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad mínima es 1")
    @Max(value = 99, message = "La cantidad no puede exceder 99")
    private Integer quantity;

    /** Permite definir si se reemplaza la cantidad o se suma */
    @Builder.Default
    private Boolean replace = true;

    /** Opcional: usado si el endpoint no recibe el ID por path */
    private Long cartItemId;
}