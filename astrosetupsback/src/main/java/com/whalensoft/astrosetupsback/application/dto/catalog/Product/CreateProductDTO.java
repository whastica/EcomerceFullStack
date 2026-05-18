package com.whalensoft.astrosetupsback.application.dto.catalog.Product;


import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateProductDTO {

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 200)
    private String name;

    @Size(max = 2000)
    private String description;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01")
    private BigDecimal price;

    @DecimalMin(value = "0.01", message = "El precio de descuento debe ser mayor a 0")
    private BigDecimal discountPrice; // opcional

    @Size(max = 100)
    private String brand;

    @NotNull(message = "La categoría es obligatoria")
    private Long categoryId;

    private String imageUrl; // Puede ser opcional

    @Builder.Default
    private Boolean hasVariations = false;

    @Builder.Default
    private Boolean active = true;
}