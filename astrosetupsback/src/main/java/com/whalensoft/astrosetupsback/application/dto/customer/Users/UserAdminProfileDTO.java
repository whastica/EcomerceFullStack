package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import com.whalensoft.astrosetupsback.application.dto.customer.Address.UserShippingAddressDTO;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
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
public class UserAdminProfileDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;

    private UserRole role;
    private UserStatus status;
    private Boolean verified;
    private LocalDateTime createdAt;

    private String cityName;
    private String postalCode;

    private List<UserShippingAddressDTO> shippingAddresses;

    private Integer totalOrders;
    private Integer pendingOrders;
    private Double totalSpent;
    private LocalDateTime lastOrderDate;

    private Boolean hasActiveOrders;
}