package com.whalensoft.astrosetupsback.application.dto.promotion;

import com.whalensoft.astrosetupsback.application.dto.sales.CartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.CartItemResponseDTO;
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

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long userId;

    @NotNull(message = "Los ítems del carrito son obligatorios")
    @Size(min = 1, message = "El carrito no puede estar vacío")
    private List<CartItemResponseDTO> cartItems;

    @Builder.Default
    private Boolean hasDiscountedProducts = false;
}