package com.whalensoft.astrosetupsback.application.dto.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePromoCodeDTO {
    @NotBlank(message = "El código promocional es obligatorio")
    @Size(min = 3, max = 50, message = "El código debe tener entre 3 y 50 caracteres")
    @Pattern(regexp = "^[A-Z0-9_-]+$", message = "El código solo puede contener letras mayúsculas, números, guiones y guiones bajos")
    private String code;

    @NotNull(message = "El porcentaje de descuento es obligatorio")
    @DecimalMin(value = "0.01", message = "El descuento debe ser mayor a 0%")
    @DecimalMax(value = "100.0", message = "El descuento no puede ser mayor a 100%")
    private Double discountPercentage;

    private LocalDateTime expirationDate;

    @Min(value = 1, message = "Los usos restantes deben ser al menos 1")
    private Integer remainingUses;

    @Builder.Default
    private Boolean forDiscountedProductsOnly = false;

    @Builder.Default
    private Boolean active = true;
}