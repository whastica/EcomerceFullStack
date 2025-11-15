package com.whalensoft.astrosetupsback.application.dto.customer.Stats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerStatusCountDTO {
    private String status; // ej: "ACTIVE", "INACTIVE", "SUSPENDED"
    private Long count;
}