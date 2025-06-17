package com.whalensoft.astrosetupsback.application.dto.common;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginationDTO {
    @Min(value = 0, message = "El número de página debe ser mayor o igual a 0")
    @Builder.Default
    private Integer page = 0;

    @Min(value = 1, message = "El tamaño de página debe ser mayor a 0")
    @Max(value = 100, message = "El tamaño de página no puede exceder 100")
    @Builder.Default
    private Integer size = 10;

    private String sortBy;
    @Builder.Default
    private String sortDirection = "ASC"; // ASC o DESC
}
