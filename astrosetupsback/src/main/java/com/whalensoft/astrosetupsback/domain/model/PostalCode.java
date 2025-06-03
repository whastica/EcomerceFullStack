package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "postal_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostalCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postal_code_id")
    private Long id;

    @Column(nullable = false)
    private String code;

    @OneToMany(mappedBy = "postalCode", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "postalCode", fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<ShippingAddress> shippingAddresses = new ArrayList<>();
}