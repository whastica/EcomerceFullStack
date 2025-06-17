package com.whalensoft.astrosetupsback.application.dto.customer;

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
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private UserRole role;
    private UserStatus status;
    private Boolean verified;
    private LocalDateTime createdAt;

    // Información de ubicación
    private String cityName;
    private String postalCode;

    // Campos calculados
    private String fullName;
    private Integer totalOrders;
    private Integer activeShippingAddresses;
}