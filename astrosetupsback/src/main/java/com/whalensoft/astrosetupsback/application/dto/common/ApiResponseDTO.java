package com.whalensoft.astrosetupsback.application.dto.common;

import java.time.Instant;

public record ApiResponseDTO<T>(
        boolean success,
        String message,
        T data,
        Instant timestamp,
        String path
) {}