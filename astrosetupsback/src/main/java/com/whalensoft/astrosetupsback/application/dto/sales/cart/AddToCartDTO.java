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
public class AddToCartDTO {

    /**
     * ID del usuario autenticado.
     * Opcional: si es null, se utilizará guestCartId.
     */
    private Long userId;

    /**
     * Identificador del carrito de invitado (cookie/token).
     * Opcional: si es null, se utilizará userId.
     */
    private String guestCartId;

    @NotNull(message = "El ID del producto es obligatorio")
    private Long productId;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    @Max(value = 99, message = "La cantidad no puede exceder 99")
    private Integer quantity;
}