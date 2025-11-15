package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAdminDTO {
    private Long id;
    private String fullName;
    private String email;
    private UserRole role;
    private UserStatus status;
    private Boolean verified;
    private LocalDateTime createdAt;

    private Integer totalOrders;
    private Integer activeShippingAddresses;

    private String cityName;
    private String postalCode;
}