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
public class ProductStockStatusDTO {
    private Long productId;
    private String productName;
    private Boolean available;
    private String availabilityMessage;
}