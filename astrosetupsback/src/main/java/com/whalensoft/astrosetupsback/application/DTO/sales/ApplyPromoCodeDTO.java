package com.whalensoft.astrosetupsback.application.DTO.sales;

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
public class ApplyPromoCodeDTO {
    @NotBlank(message = "El código promocional es obligatorio")
    @Size(max = 50, message = "El código no puede exceder 50 caracteres")
    private String promoCode;

    private Long userId; // Opcional para compra sin registro
    private Long cartId; // Para aplicar a carrito específico
}
