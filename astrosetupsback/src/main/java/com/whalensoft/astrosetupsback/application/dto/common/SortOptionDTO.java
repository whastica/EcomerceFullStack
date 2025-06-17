package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SortOptionDTO {
    private String field;
    private String label;
    private String direction; // ASC, DESC
    //private Boolean default = false;
}
