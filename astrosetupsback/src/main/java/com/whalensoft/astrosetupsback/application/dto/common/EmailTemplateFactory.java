package com.whalensoft.astrosetupsback.application.dto.common;

import java.util.List;
import java.util.Map;

public final class EmailTemplateFactory {

    private EmailTemplateFactory() {
        // Evita instanciación
    }

    public static EmailTemplateDTO create(
            String toEmail,
            String toName,
            String subject,
            String templateName,
            Map<String, Object> variables,
            List<String> attachments
    ) {
        return new EmailTemplateDTO(
                toEmail,
                toName,
                subject,
                templateName,
                variables,
                attachments
        );
    }

    // Ejemplo: Factory específica para correo de bienvenida
    public static EmailTemplateDTO welcomeEmail(
            String toEmail,
            String toName
    ) {
        return new EmailTemplateDTO(
                toEmail,
                toName,
                "Bienvenido a Astro Setups",
                "welcome-template",
                Map.of("username", toName),
                List.of()
        );
    }
}