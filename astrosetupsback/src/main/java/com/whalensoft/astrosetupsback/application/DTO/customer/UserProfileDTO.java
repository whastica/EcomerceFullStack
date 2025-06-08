package com.whalensoft.astrosetupsback.application.DTO.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private UserStatus status;
    private Boolean verified;
    private LocalDateTime createdAt;

    // Información de ubicación
    private String cityName;
    private String postalCode;

    // Direcciones de envío
    private List<UserShippingAddressDTO> shippingAddresses;

    // Estadísticas del usuario
    private Integer totalOrders;
    private Integer pendingOrders;
    private Double totalSpent;
    private LocalDateTime lastOrderDate;

    // Campos calculados
    private String fullName;
    private Boolean hasActiveOrders;
}
