package com.whalensoft.astrosetupsback.infra.config;

import com.whalensoft.astrosetupsback.infra.security.JwtAuthenticationFilter;
import com.whalensoft.astrosetupsback.application.dto.common.ErrorResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final String[] allowedOrigins;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            @Value("${cors.allowed-origins}") String allowedOrigins) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.allowedOrigins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .toArray(String[]::new);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // =============================================
                        // PÚBLICOS - Health check (Railway)
                        // =============================================
                        .requestMatchers(HttpMethod.GET, "/api/health").permitAll()

                        // =============================================
                        // PÚBLICOS - Auth
                        // =============================================
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

                        // =============================================
                        // PÚBLICOS - Catálogo (solo lectura)
                        // =============================================
                        .requestMatchers(HttpMethod.GET, "/api/catalog/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/catalog/products/_search").permitAll()

                        // =============================================
                        // PÚBLICOS - Promociones (validar código)
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/validate").permitAll()

                        // =============================================
                        // PÚBLICOS - Envío (datos de referencia)
                        // =============================================
                        .requestMatchers(HttpMethod.GET, "/api/shipping/cities").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/shipping/postal-codes/**").permitAll()

                        // =============================================
                        // PÚBLICOS - Carrito guest y alta de items
                        // (lectura/escritura de carrito de usuario exige auth;
                        //  los claims de usuario se validan en el controlador)
                        // =============================================
                        .requestMatchers(HttpMethod.GET, "/api/cart/guest/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/cart/items").permitAll()

                        // =============================================
                        // ADMIN - Catálogo (escritura)
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/catalog/products").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/catalog/products/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/catalog/products/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/catalog/categories").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/catalog/categories/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/catalog/category-types").hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // =============================================
                        // ADMIN - Clientes
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/customers").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/customers/_search").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/stats").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/{id}").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/{id}/profile").hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // =============================================
                        // ADMIN - Ventas
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/sales/orders/search").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/sales/orders/{id}/status").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/sales/stats").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/sales/stats/series").hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // =============================================
                        // ADMIN - Promociones
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/promotions/codes/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/promotions/codes/{code}").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/search").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/promotions/codes/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/promotions/codes/stats").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/bulk-create").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/bulk-update").hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // =============================================
                        // ADMIN - Envíos
                        // =============================================
                        .requestMatchers(HttpMethod.GET, "/api/shipping/stats").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        // Listado global de direcciones: solo administradores
                        .requestMatchers(HttpMethod.GET, "/api/shipping/addresses").hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // =============================================
                        // AUTENTICADOS - Todo lo demás
                        // =============================================
                        .anyRequest().authenticated()
                )
                // 401/403 con cuerpo JSON consistente (ErrorResponseDTO)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) ->
                                writeError(response, HttpServletResponse.SC_UNAUTHORIZED,
                                        "UNAUTHORIZED", "Autenticacion requerida", request.getRequestURI()))
                        .accessDeniedHandler((request, response, accessDeniedException) ->
                                writeError(response, HttpServletResponse.SC_FORBIDDEN,
                                        "ACCESS_DENIED", "No tienes permisos para este recurso", request.getRequestURI())))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private void writeError(HttpServletResponse response, int status,
                            String errorCode, String message, String path) throws java.io.IOException {
        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        ErrorResponseDTO error = ErrorResponseDTO.create(message, errorCode, path);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Origenes desde variable de entorno CORS_ALLOWED_ORIGINS (ver application.properties)
        config.setAllowedOrigins(List.of(allowedOrigins));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
