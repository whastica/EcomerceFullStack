package com.whalensoft.astrosetupsback.application.dto.sales.checkout;

import com.whalensoft.astrosetupsback.application.dto.customer.Users.GuestUserDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.payment.PaymentMethodDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcessCheckoutDTO {

    /**
     * Carrito sobre el que se procesará el checkout.
     */
    @NotNull(message = "El ID del carrito es obligatorio")
    private Long cartId;

    /**
     * Dirección de envío de un usuario registrado.
     * Si este campo está presente, guestUser debe ser null.
     */
    private Long shippingAddressId;

    /**
     * Datos del usuario invitado.
     * Si este campo está presente, shippingAddressId debe ser null.
     */
    private GuestUserDTO guestUser;

    /**
     * Código promocional (único por ahora).
     */
    private String promoCode;

    /**
     * Método de pago seleccionado.
     */
    @NotNull(message = "El método de pago es obligatorio")
    private PaymentMethodDTO paymentMethod;

    /**
     * Confirmación obligatoria del usuario.
     */
    @NotNull(message = "Debes aceptar los términos y condiciones")
    private Boolean acceptedTerms;

    /**
     * Notas opcionales para el envío.
     */
    private String orderNotes;
}