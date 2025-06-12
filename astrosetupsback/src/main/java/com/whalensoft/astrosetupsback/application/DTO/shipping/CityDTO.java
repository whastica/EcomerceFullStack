package com.whalensoft.astrosetupsback.application.DTO.shipping;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CityDTO {
    private Long id;

    @NotBlank(message = "El nombre de la ciudad es obligatorio")
    @Size(max = 100, message = "El nombre de la ciudad no puede exceder 100 caracteres")
    private String name;

    private Integer usersCount;
    private Integer shippingAddressesCount;
    private List<PostalCodeSummaryDTO> postalCodes;
}