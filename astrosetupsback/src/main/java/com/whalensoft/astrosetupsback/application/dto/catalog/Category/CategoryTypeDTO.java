package com.whalensoft.astrosetupsback.application.dto.catalog.Category;

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

    @NotBlank
    @Size(max = 100)
    private String name;
}
