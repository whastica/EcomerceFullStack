package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAdminSummaryDTO {
    private Long id;
    private String fullName;
    private String email;
    private UserRole role;
    private UserStatus status;
    private Boolean verified;
    private LocalDateTime createdAt;
    private Integer totalOrders;
}