package com.whalensoft.astrosetupsback.application.dto.customer.Stats;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerStatsDTO {

    // Totales globales
    private Long totalCustomers;
    private Long verifiedCustomers;
    private Long unverifiedCustomers;

    // Estado de actividad
    private Long activeCustomers;
    private Long inactiveCustomers;

    // Nuevos clientes
    private Long newCustomersThisMonth;

    // Detalle por estado (más fácil para frontend)
    private List<CustomerStatusCountDTO> customersByStatus;

    // Métricas comerciales
    private Double avgOrdersPerCustomer;

    private Long totalShippingAddresses;
}