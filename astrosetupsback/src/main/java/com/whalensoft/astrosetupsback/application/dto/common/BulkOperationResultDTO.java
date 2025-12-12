package com.whalensoft.astrosetupsback.application.dto.common;

import java.util.List;

import java.time.Instant;


public record BulkOperationResultDTO(
        int totalRequested,
        int successCount,
        int errorCount,
        List<String> errors,
        BulkOperationType operation,
        Instant executedAt,
        boolean completed
) {}