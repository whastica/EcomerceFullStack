package com.whalensoft.astrosetupsback.application.dto.common;

import java.util.List;
import java.util.Map;

public final class BulkOperationFactory {

    private BulkOperationFactory() {}

    public static BulkOperationDTO create(
            List<Long> ids,
            BulkOperationType operation,
            Map<String, Object> parameters,
            String reason
    ) {
        return new BulkOperationDTO(
                ids,
                operation,
                parameters != null ? parameters : java.util.Collections.emptyMap(),
                reason
        );
    }
}
