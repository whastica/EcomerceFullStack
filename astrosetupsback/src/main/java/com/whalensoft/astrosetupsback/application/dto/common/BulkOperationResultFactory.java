package com.whalensoft.astrosetupsback.application.dto.common;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

public final class BulkOperationResultFactory {

    private BulkOperationResultFactory() {}

    public static BulkOperationResultDTO create(
            int totalRequested,
            int successCount,
            List<String> errors,
            BulkOperationType operation
    ) {
        List<String> errorList = errors != null ? errors : Collections.emptyList();

        return new BulkOperationResultDTO(
                totalRequested,
                successCount,
                errorList.size(),
                errorList,
                operation,
                Instant.now(),
                true
        );
    }

    public static BulkOperationResultDTO failed(
            BulkOperationType operation,
            String errorMessage
    ) {
        return new BulkOperationResultDTO(
                0,
                0,
                1,
                List.of(errorMessage),
                operation,
                Instant.now(),
                false
        );
    }
}