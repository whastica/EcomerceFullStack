package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterOptionDTO {
    private String key;
    private String label;
    private Object value;
    private Long count;
    private Boolean selected = false;
    private String category;
}