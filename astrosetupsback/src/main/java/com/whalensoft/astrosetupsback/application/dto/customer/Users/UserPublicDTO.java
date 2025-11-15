package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPublicDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String fullName;
}