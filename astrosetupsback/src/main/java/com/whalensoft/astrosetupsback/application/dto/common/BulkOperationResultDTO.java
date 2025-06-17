package com.whalensoft.astrosetupsback.application.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkOperationResultDTO {
    private Integer totalRequested;
    private Integer successCount;
    private Integer errorCount;
    private List<String> errors;
    private String operation;
    private LocalDateTime executedAt;
    private Boolean completed;
}

