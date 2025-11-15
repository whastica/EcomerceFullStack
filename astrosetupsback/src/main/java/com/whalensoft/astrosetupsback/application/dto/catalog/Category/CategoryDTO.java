package com.whalensoft.astrosetupsback.application.dto.catalog.Category;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {

    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    private CategoryTypeDTO categoryType;
}