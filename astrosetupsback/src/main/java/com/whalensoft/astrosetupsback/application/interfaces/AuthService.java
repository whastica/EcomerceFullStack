package com.whalensoft.astrosetupsback.application.interfaces;

import com.whalensoft.astrosetupsback.application.dto.auth.AuthResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.CurrentUserDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.LoginRequestDTO;
import com.whalensoft.astrosetupsback.application.dto.auth.RegisterRequestDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO registerRequestDTO);

    AuthResponseDTO login(LoginRequestDTO loginRequestDTO);

    CurrentUserDTO getCurrentUser(Long userId);
}
