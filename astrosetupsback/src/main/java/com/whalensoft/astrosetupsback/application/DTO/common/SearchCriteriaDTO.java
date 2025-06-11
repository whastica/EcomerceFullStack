package com.whalensoft.astrosetupsback.application.DTO.common;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchCriteriaDTO {
    @Size(max = 100, message = "El término de búsqueda no puede exceder 100 caracteres")
    private String searchTerm;

    private List<String> tags;
    private LocalDateTime dateFrom;
    private LocalDateTime dateTo;
    private Double priceMin;
    private Double priceMax;
    private Boolean active;
    private List<Long> categoryIds;
    private List<String> brands;
    private String status;
}
