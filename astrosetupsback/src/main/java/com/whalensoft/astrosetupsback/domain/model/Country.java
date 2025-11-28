package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "countries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false, length = 100, unique = true)
    private String name;

    @Column(nullable = false, length = 3, unique = true)
    private String isoCode; // Ej: "COL", "USA", "ARG"

    @OneToMany(mappedBy = "country", fetch = FetchType.LAZY)
    @Builder.Default
    private List<State> states = new ArrayList<>();
}