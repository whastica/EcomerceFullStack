package com.whalensoft.astrosetupsback.application.dto.sales.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesStatsDTO {

    /** Total de órdenes registradas en el sistema */
    private Long totalOrders;

    /** Órdenes que están pendientes de preparación/envío */
    private Long ordersPending;

    /** Órdenes que ya fueron enviadas */
    private Long ordersShipped;

    /** Órdenes entregadas exitosamente */
    private Long ordersDelivered;

    /** Órdenes canceladas */
    private Long ordersCancelled;

    /** Ingresos totales generados por ventas */
    private BigDecimal totalRevenue;

    /** Valor promedio por orden */
    private BigDecimal averageOrderValue;

    /** Total de clientes únicos que realizaron órdenes */
    private Long totalCustomers;
}