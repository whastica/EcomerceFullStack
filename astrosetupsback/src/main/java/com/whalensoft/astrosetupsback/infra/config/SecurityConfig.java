package com.whalensoft.astrosetupsback.infra.config;

import com.whalensoft.astrosetupsback.infra.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
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
                        // PÚBLICOS - Carrito (funcionalidad sin login)
                        // =============================================
                        .requestMatchers("/api/cart/**").permitAll()

                        // =============================================
                        // ADMIN - Catálogo (escritura)
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/catalog/products").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/catalog/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/catalog/categories").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/catalog/categories/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/catalog/category-types").hasRole("ADMIN")

                        // =============================================
                        // ADMIN - Clientes
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/customers").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/stats").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/customers/{id}/profile").hasRole("ADMIN")

                        // =============================================
                        // ADMIN - Ventas
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/sales/orders/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/sales/orders/{id}/status").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/sales/stats").hasRole("ADMIN")

                        // =============================================
                        // ADMIN - Promociones
                        // =============================================
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/promotions/codes/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/promotions/codes/{code}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/search").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/promotions/codes/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/promotions/codes/stats").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/bulk-create").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/promotions/codes/bulk-update").hasRole("ADMIN")

                        // =============================================
                        // ADMIN - Envíos
                        // =============================================
                        .requestMatchers(HttpMethod.GET, "/api/shipping/stats").hasRole("ADMIN")

                        // =============================================
                        // AUTENTICADOS - Todo lo demás
                        // =============================================
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:3000"
        ));

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
