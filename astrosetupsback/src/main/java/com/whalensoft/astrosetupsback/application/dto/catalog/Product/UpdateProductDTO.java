package com.whalensoft.astrosetupsback.application.dto.catalog.Product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProductDTO {

    @NotBlank
    @Size(max = 200)
    private String name;

    @Size(max = 2000)
    private String description;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal price;

    private BigDecimal discountPrice;

    @Size(max = 100)
    private String brand;

    @NotNull
    private Long categoryId;

    private String imageUrl;

    private Boolean hasVariations;

    private Boolean active;
}