package com.whalensoft.astrosetupsback.infra.adapters;

import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import com.whalensoft.astrosetupsback.domain.repository.UserRepository;
import com.whalensoft.astrosetupsback.infra.repository.JpaUserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserRepositoryAdapter implements UserRepository {

    private final JpaUserRepository jpaRepository;

    public UserRepositoryAdapter(JpaUserRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public User save(User user) {
        return jpaRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return false;
    }

    @Override
    public List<User> findByRole(UserRole role) {
        return List.of();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaRepository.findByEmail(email);
    }

    @Override
    public List<User> findByStatus(UserStatus status) {
        return List.of();
    }

    @Override
    public List<User> findByVerified(Boolean verified) {
        return List.of();
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return null;
    }
}