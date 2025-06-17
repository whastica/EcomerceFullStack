package com.whalensoft.astrosetupsback.application.dto.common;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BulkOperationDTO {
    @NotEmpty(message = "La lista de IDs no puede estar vacía")
    private List<Long> ids;

    @NotBlank(message = "La operación es obligatoria")
    private String operation; // DELETE, UPDATE, ACTIVATE, DEACTIVATE

    private Map<String, Object> parameters;
    private String reason;
}