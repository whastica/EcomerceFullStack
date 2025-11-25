package com.whalensoft.astrosetupsback.application.dto.promotion.validation;

import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartItemResponseDTO;
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
public class PromoCodeValidationDTO {

    @NotBlank(message = "El código promocional es obligatorio")
    private String promoCode;

    // Opcional: el usuario puede NO estar registrado
    // En checkout se permite "guest user"
    private Long userId;

    @NotNull(message = "Los ítems del carrito son obligatorios")
    @Size(min = 1, message = "El carrito no puede estar vacío")
    private List<CartItemResponseDTO> cartItems;

    /**
     * Este campo NO lo envía el frontend.
     * El backend lo calcula automáticamente revisando cada CartItemResponseDTO.
     *
     * Se deja para que el servicio de promociones pueda recibirlo ya calculado
     * si el módulo sales decide preprocesar el carrito.
     */
    @Builder.Default
    private Boolean hasDiscountedProducts = false;

    /**
     * Campo opcional para permitir que el módulo de promociones
     * tome decisiones dependiendo de si el usuario viene del checkout directo
     * o desde la vista del carrito.
     */
    @Builder.Default
    private Boolean previewMode = true;
}