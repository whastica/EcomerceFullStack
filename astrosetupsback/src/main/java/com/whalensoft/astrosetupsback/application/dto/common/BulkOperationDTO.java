package com.whalensoft.astrosetupsback.application.dto.common;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

import java.util.Map;

@Builder
public record BulkOperationDTO(

        @NotEmpty(message = "La lista de IDs no puede estar vacía")
        @Size(max = 2000, message = "El número máximo permitido de IDs es 2000")
        java.util.List<Long> ids,

        @NotNull(message = "La operación es obligatoria")
        BulkOperationType operation,

        Map<String, Object> parameters,

        String reason
) {}