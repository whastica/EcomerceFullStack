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

    private String name;

    private String slug;

    private CategoryTypeDTO categoryType;

    private Integer productCount;

}