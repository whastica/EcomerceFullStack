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
    private List<OrderSummaryDTO> orders;
    private Long totalElements;
    private Integer totalPages;
    private Integer currentPage;
    private Integer pageSize;
    private Boolean hasNext;
    private Boolean hasPrevious;
}