package com.whalensoft.astrosetupsback.domain.repository;

import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> findByStatus(UserStatus status);
    List<User> findByVerified(Boolean verified);
    Page<User> findAll(Pageable pageable);
    void deleteById(Long id);
    boolean existsByEmail(String email);
    List<User> findByRole(UserRole role);
}
