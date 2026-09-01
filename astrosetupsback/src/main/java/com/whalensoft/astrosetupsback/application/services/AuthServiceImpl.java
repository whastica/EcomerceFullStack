package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.auth.AuthResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.CurrentUserDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.LoginRequestDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.RegisterRequestDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.UserInfoDTO;
import com.whalensoft.astrosetupsback.application.interfaces.AuthService;
import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import com.whalensoft.astrosetupsback.domain.repository.UserRepository;
import com.whalensoft.astrosetupsback.infra.exceptions.AccountDisabledException;
import com.whalensoft.astrosetupsback.infra.exceptions.InvalidCredentialsException;
import com.whalensoft.astrosetupsback.infra.security.JwtProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        // Normalizar email
        String normalizedEmail = registerRequestDTO.getEmail().trim().toLowerCase();

        // Verificar unicidad del email
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new RuntimeException(ErrorMessages.EMAIL_ALREADY_EXISTS);
        }

        // Crear usuario
        User user = User.builder()
                .firstName(registerRequestDTO.getFirstName().trim())
                .lastName(registerRequestDTO.getLastName().trim())
                .email(normalizedEmail)
                .phone(registerRequestDTO.getPhone().trim())
                .passwordHash(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .role(UserRole.CLIENT)
                .status(UserStatus.ACTIVE)
                .verified(false)
                .build();

        User savedUser = userRepository.save(user);

        // Generar token
        String token = jwtProvider.generateToken(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole());

        // Construir respuesta
        UserInfoDTO userInfo = UserInfoDTO.builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();

        return AuthResponseDTO.builder()
                .token(token)
                .user(userInfo)
                .build();
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        // Normalizar email
        String normalizedEmail = loginRequestDTO.getEmail().trim().toLowerCase();

        // Buscar usuario por email
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException(ErrorMessages.INVALID_LOGIN_CREDENTIALS));

        // Validar contraseña con BCrypt
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException(ErrorMessages.INVALID_LOGIN_CREDENTIALS);
        }

        // Verificar estado del usuario
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new AccountDisabledException(ErrorMessages.ACCOUNT_DISABLED);
        }

        // Generar token
        String token = jwtProvider.generateToken(user.getId(), user.getEmail(), user.getRole());

        // Construir respuesta
        UserInfoDTO userInfo = UserInfoDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return AuthResponseDTO.builder()
                .token(token)
                .user(userInfo)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public CurrentUserDTO getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.USER_NOT_FOUND));

        return CurrentUserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .status(user.getStatus())
                .verified(user.getVerified())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
