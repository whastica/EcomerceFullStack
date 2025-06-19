package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplyPromoCodeDTO {
    @NotBlank(message = "El código promocional es obligatorio")
    @Size(max = 50, message = "El código no puede exceder 50 caracteres")
    private String promoCode;

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long userId;

    private Long orderId; // Opcional, para aplicar a una orden específica

    @NotNull(message = "El subtotal es obligatorio")
    @DecimalMin(value = "0.01", message = "El subtotal debe ser mayor a 0")
    private Double subtotal;
}
