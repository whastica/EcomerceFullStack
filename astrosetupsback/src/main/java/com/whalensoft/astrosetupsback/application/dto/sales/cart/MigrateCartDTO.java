package com.whalensoft.astrosetupsback.application.dto.sales.cart;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MigrateCartDTO {

    @NotNull(message = "El ID del carrito guest es obligatorio")
    private String guestCartId;

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long userId;
}
