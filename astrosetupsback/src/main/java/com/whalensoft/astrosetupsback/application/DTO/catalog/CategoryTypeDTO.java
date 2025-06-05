package com.whalensoft.astrosetupsback.application.DTO.catalog;

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
public class CategoryTypeDTO {
    private Long id;

    @NotBlank(message = "El nombre del tipo de categoría es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String name;

    private List<CategorySummaryDTO> categories;
    private Integer categoryCount;
}
