package com.whalensoft.astrosetupsback.infra.controllers;

import com.whalensoft.astrosetupsback.application.dto.auth.AuthResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.CurrentUserDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.LoginRequestDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.RegisterRequestDTO;
import com.whalensoft.astrosetupsback.application.interfaces.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        AuthResponseDTO response = authService.register(registerRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        AuthResponseDTO response = authService.login(loginRequestDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<CurrentUserDTO> getCurrentUser() {
        Long userId = (Long) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        CurrentUserDTO user = authService.getCurrentUser(userId);
        return ResponseEntity.ok(user);
    }
}
