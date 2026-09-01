package com.whalensoft.astrosetupsback.application.dto.auth;

import com.whalensoft.astrosetupsback.domain.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private UserRole role;
}
