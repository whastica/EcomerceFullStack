package com.whalensoft.astrosetupsback.application.dto.sales.checkout;

import com.whalensoft.astrosetupsback.application.dto.customer.Address.UserShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartItemResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.payment.PaymentMethodDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutSummaryDTO {

    /**
     * Items del carrito con precios, disponibilidad y descuentos ya calculados.
     */
    private List<CartItemResponseDTO> items;

    /**
     * Subtotal antes de descuentos, envío e impuestos.
     */
    private BigDecimal subtotal;

    /**
     * Lista de códigos promocionales aplicados (solo strings).
     */
    private List<String> appliedPromoCodes;

    /**
     * Total acumulado de descuentos aplicados.
     */
    private BigDecimal totalDiscount;

    /**
     * Costo de envío según dirección y transportadora.
     */
    private BigDecimal shippingCost;

    /**
     * Impuestos aplicados (IVA, etc.)
     */
    private BigDecimal taxes;

    /**
     * Total final a pagar.
     */
    private BigDecimal total;

    /**
     * Cantidad total de ítems (suma de cantidades).
     */
    private Integer totalItems;

    /**
     * Moneda utilizada para los cálculos.
     */
    private String currency;

    /**
     * Dirección del usuario seleccionada para este checkout.
     */
    private UserShippingAddressDTO selectedAddress;

    /**
     * Método de pago elegido por el usuario.
     */
    private PaymentMethodDTO selectedPaymentMethod;

    /**
     * Fecha estimada de entrega.
     */
    private LocalDate estimatedDeliveryDate;

    /**
     * ID del checkout actual (por si se maneja estado).
     */
    private String checkoutId;
}