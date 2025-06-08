package com.whalensoft.astrosetupsback.application.DTO.customer;

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
    private String searchTerm; // Buscar por nombre, apellido o email
    private UserRole role;
    private UserStatus status;
    private Boolean verified;
    private Long cityId;
    private String sortBy; // firstName, lastName, email, createdAt
    private String sortDirection; // ASC, DESC
    private Integer page;
    private Integer size;
}