package com.whalensoft.astrosetupsback.application.DTO.common;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplateDTO {
    @NotBlank(message = "El destinatario es obligatorio")
    @Email(message = "El formato del email no es válido")
    private String toEmail;

    private String toName;

    @NotBlank(message = "El asunto es obligatorio")
    private String subject;

    @NotBlank(message = "El template es obligatorio")
    private String templateName;

    private Map<String, Object> variables;
    private List<String> attachments;
}
