package com.whalensoft.astrosetupsback.application.DTO.sales;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartSummaryDTO {
    private Long id;
    private Double total;
    private Integer totalItems;
    private Boolean isExpired;
    private LocalDateTime expiration;
}
