package com.whalensoft.astrosetupsback.application.DTO.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerStatsDTO {
    private Long totalCustomers;
    private Long activeCustomers;
    private Long inactiveCustomers;
    private Long verifiedCustomers;
    private Long unverifiedCustomers;
    private Long newCustomersThisMonth;
    private Map<UserStatus, Long> customersByStatus;
    private Double averageOrdersPerCustomer;
    private Long totalShippingAddresses;
}
