package com.whalensoft.astrosetupsback.application.dto.sales.orders;

import com.whalensoft.astrosetupsback.application.dto.customer.Users.GuestUserDTO;
import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderDTO {

    /** Usuario registrado (opcional si es invitado) */
    private Long userId;

    /** Datos mínimos de usuario invitado */
    private GuestUserDTO guestUser;

    /** Método de pago seleccionado */
    @NotNull(message = "El método de pago es obligatorio")
    private PaymentMethod paymentMethod;

    /** Código promocional aplicado, si aplica */
    private String promoCode;

    /** Items del pedido (obligatorio, al menos 1) */
    @NotNull(message = "El pedido debe contener al menos un ítem")
    @Size(min = 1, message = "El pedido debe contener al menos un ítem")
    private List<CreateOrderItemDTO> items;

    /** Notas adicionales del pedido */
    private String orderNotes;
}