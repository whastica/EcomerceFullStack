package com.whalensoft.astrosetupsback.application.dto.customer.Users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSearchDTO {
    private String searchTerm;
    private UserRole role;
    private UserStatus status;
    private Boolean verified;
    private Long cityId;

    private String sortBy;
    private String sortDirection;

    @Builder.Default private Integer page = 0;
    @Builder.Default private Integer size = 20;
}