package com.whalensoft.astrosetupsback.application.dto.sales.payment;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodDTO {

    /**
     * Tipo de método de pago seleccionado por el usuario.
     * Ejemplos: CARD, PAYPAL, CASH_ON_DELIVERY, BANK_TRANSFER, NEQUI, DAVIPLATA.
     */
    @NotNull(message = "El método de pago es obligatorio")
    private PaymentMethodType type;

    /**
     * Nombre visible para el usuario: "Visa", "Mastercard", "PayPal", "Nequi", etc.
     */
    private String displayName;

    /**
     * Información opcional según el tipo de pago.
     * Ejemplos:
     *  - En tarjetas: "**** 5423"
     *  - En PayPal: correo asociado
     *  - En Nequi: número de teléfono
     */
    private String reference;

    /**
     * Indica si este método está disponible actualmente según reglas del negocio.
     */
    private Boolean enabled;
}