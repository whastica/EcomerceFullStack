package com.whalensoft.astrosetupsback.application.dto.catalog;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateProductDTO {
    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 200, message = "El nombre no puede exceder 200 caracteres")
    private String name;

    @Size(max = 2000, message = "La descripción no puede exceder 2000 caracteres")
    private String description;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    private Double price;

    @DecimalMin(value = "0.01", message = "El precio de descuento debe ser mayor a 0")
    private Double discountPrice;

    @Size(max = 100, message = "La marca no puede exceder 100 caracteres")
    private String brand;

    @NotNull(message = "La categoría es obligatoria")
    private Long categoryId;

    @Pattern(regexp = "^(http|https)://.*", message = "La URL de la imagen debe ser válida")
    private String imageUrl;

    private Boolean hasVariations = false;
}