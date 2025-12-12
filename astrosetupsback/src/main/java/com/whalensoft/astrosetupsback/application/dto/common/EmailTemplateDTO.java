package com.whalensoft.astrosetupsback.application.dto.common;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

public record EmailTemplateDTO(
        @NotBlank(message = "El destinatario es obligatorio")
        @Email(message = "El formato del email no es válido")
        String toEmail,

        String toName,

        @NotBlank(message = "El asunto es obligatorio")
        String subject,

        @NotBlank(message = "El template es obligatorio")
        String templateName,

        Map<String, Object> variables,

        List<String> attachments
) { }