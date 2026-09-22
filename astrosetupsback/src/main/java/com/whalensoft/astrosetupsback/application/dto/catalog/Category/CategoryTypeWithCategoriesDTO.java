package com.whalensoft.astrosetupsback.application.dto.catalog.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryTypeWithCategoriesDTO {
    private Long id;
    private String name;
    private List<CategorySummaryDTO> categories;
}
