package com.whalensoft.astrosetupsback.application.dto.sales.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

/**
 * Serie temporal de ventas para gráficos del dashboard.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesSeriesDTO {

    /** Periodo solicitado: 7d | 30d | 90d */
    private String period;

    /** Cantidad de días cubiertos */
    private Integer days;

    /** Puntos día a día (incluye días sin ventas) */
    private List<SeriesPoint> points;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SeriesPoint {

        /** Fecha del punto (día) */
        private LocalDate date;

        /** Etiqueta corta para el eje X, ej: 25/09 */
        private String label;

        /** Cantidad de órdenes ese día */
        private Long orders;

        /** Ingresos ese día (suma de totales) */
        private Double revenue;
    }
}
