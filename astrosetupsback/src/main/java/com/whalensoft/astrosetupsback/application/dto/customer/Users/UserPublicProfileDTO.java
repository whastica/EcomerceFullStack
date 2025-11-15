package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import com.whalensoft.astrosetupsback.application.dto.customer.Address.UserShippingAddressDTO;
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
public class UserPublicProfileDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    private String fullName;

    // shipping addresses del cliente
    private List<UserShippingAddressDTO> shippingAddresses;

    // estadísticas básicas
    private Integer totalOrders;
    private Double totalSpent;
    private LocalDateTime lastOrderDate;
}