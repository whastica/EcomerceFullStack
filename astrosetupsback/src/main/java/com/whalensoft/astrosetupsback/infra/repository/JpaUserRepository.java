package com.whalensoft.astrosetupsback.infra.repository;

import com.whalensoft.astrosetupsback.domain.model.User;
import com.whalensoft.astrosetupsback.domain.model.UserStatus;
import com.whalensoft.astrosetupsback.domain.model.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JpaUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByStatus(UserStatus status);
    List<User> findByVerified(Boolean verified);

    boolean existsByEmail(String email);
    boolean existsById(Long id);

    List<User> findByRole(UserRole role);

    @Query("SELECT u FROM User u WHERE u.status != 'DELETED'")
    List<User> findAllActive();

    @Query("""
           SELECT u FROM User u
           WHERE (LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
              OR LOWER(u.phone) LIKE LOWER(CONCAT('%', :keyword, '%')) )
           AND u.status != 'DELETED'
           """)
    Page<User> search(@Param("keyword") String keyword, Pageable pageable);

    long countByRole(UserRole role);
}