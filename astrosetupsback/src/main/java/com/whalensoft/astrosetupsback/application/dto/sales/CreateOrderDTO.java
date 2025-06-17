package com.whalensoft.astrosetupsback.application.dto.sales;

import com.whalensoft.astrosetupsback.domain.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderDTO {
    private Long userId; // Opcional para compra sin registro

    @NotNull(message = "El método de pago es obligatorio")
    private PaymentMethod paymentMethod;

    @NotNull(message = "La dirección de envío es obligatoria")
    private Long shippingAddressId;

    @NotEmpty(message = "La orden debe tener al menos un item")
    private List<CreateOrderItemDTO> orderItems;

    // Para compra sin registro
    private GuestUserDTO guestUser;
    private CreateShippingAddressDTO guestShippingAddress;

    // Códigos promocionales a aplicar
    private List<String> promoCodes;
}
