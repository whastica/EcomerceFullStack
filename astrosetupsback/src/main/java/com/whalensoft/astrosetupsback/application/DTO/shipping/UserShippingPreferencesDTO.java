package com.whalensoft.astrosetupsback.application.DTO.shipping;

import jakarta.validation.constraints.DecimalMin;
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
public class UserShippingPreferencesDTO {
    private Long userId;
    private List<ShippingAddressSummaryDTO> addresses;
    private ShippingAddressSummaryDTO defaultAddress;
    private Integer totalAddresses;
    private String preferredCity;
}