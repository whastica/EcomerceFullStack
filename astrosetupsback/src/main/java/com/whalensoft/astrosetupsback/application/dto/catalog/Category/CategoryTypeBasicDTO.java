package com.whalensoft.astrosetupsback.application.dto.catalog.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryTypeBasicDTO {
    private Long id;
    private String name;
}