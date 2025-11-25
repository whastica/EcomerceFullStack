package com.whalensoft.astrosetupsback.application.dto.sales.search;

import com.whalensoft.astrosetupsback.application.dto.sales.orders.OrderSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderSearchResultDTO {

    /** Lista de órdenes resumidas para esta página */
    private List<OrderSummaryDTO> orders;

    /** Total de elementos que coinciden con la búsqueda */
    private Long totalElements;

    /** Total de páginas disponibles */
    private Integer totalPages;

    /** Página actual (0-indexed) */
    private Integer currentPage;

    /** Tamaño de página usado en esta respuesta */
    private Integer pageSize;

    /** Conveniencia: si hay una página siguiente */
    @Builder.Default
    private Boolean hasNext = false;

    /** Conveniencia: si hay una página anterior */
    @Builder.Default
    private Boolean hasPrevious = false;

    /** Métodos de utilidad (opcional) */
    public void calculatePaginationFlags() {
        this.hasNext = currentPage < (totalPages - 1);
        this.hasPrevious = currentPage > 0;
    }
}