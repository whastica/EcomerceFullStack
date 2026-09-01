package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.common.InfoMessages;
import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.bullk.BulkCreatePromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.bullk.BulkPromoCodeActionDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.bullk.BulkPromoCodeActionResultDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.code.*;
import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoCodeBulkAction;
import com.whalensoft.astrosetupsback.application.dto.promotion.enums.PromoDiscountType;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.ApplyPromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationResultDTO;
import com.whalensoft.astrosetupsback.application.interfaces.PromotionService;
import com.whalensoft.astrosetupsback.domain.model.Order;
import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import com.whalensoft.astrosetupsback.domain.repository.OrderRepository;
import com.whalensoft.astrosetupsback.domain.repository.PromoCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class PromotionServiceImpl implements PromotionService {

    private final PromoCodeRepository promoCodeRepository;
    private final OrderRepository orderRepository;

    @Override
    public PromoCodeDTO createPromoCode(CreatePromoCodeDTO createPromoCodeDTO) {
        if (promoCodeRepository.existsByCode(createPromoCodeDTO.getCode())) {
            throw new IllegalArgumentException("El código promocional ya existe");
        }

        PromoCode promoCode = PromoCode.builder()
                .code(createPromoCodeDTO.getCode())
                .discountPercentage(createPromoCodeDTO.getDiscountValue())
                .expirationDate(createPromoCodeDTO.getExpirationDate())
                .remainingUses(createPromoCodeDTO.getRemainingUses())
                .forDiscountedProductsOnly(createPromoCodeDTO.getOnlyForDiscountedProducts())
                .active(createPromoCodeDTO.getActive())
                .build();

        PromoCode savedPromoCode = promoCodeRepository.save(promoCode);
        return convertToDTO(savedPromoCode);
    }

    @Override
    public PromoCodeDTO updatePromoCode(String code, UpdatePromoCodeDTO updatePromoCodeDTO) {
        PromoCode promoCode = promoCodeRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.PROMO_CODE_NOT_FOUND));

        if (updatePromoCodeDTO.getDiscountValue() != null) {
            promoCode.setDiscountPercentage(updatePromoCodeDTO.getDiscountValue());
        }

        if (updatePromoCodeDTO.getExpirationDate() != null) {
            promoCode.setExpirationDate(updatePromoCodeDTO.getExpirationDate());
        }

        if (updatePromoCodeDTO.getRemainingUses() != null) {
            promoCode.setRemainingUses(updatePromoCodeDTO.getRemainingUses());
        }

        if (updatePromoCodeDTO.getForDiscountedProductsOnly() != null) {
            promoCode.setForDiscountedProductsOnly(
                    updatePromoCodeDTO.getForDiscountedProductsOnly()
            );
        }

        if (updatePromoCodeDTO.getActive() != null) {
            promoCode.setActive(updatePromoCodeDTO.getActive());
        }

        PromoCode updatedPromoCode = promoCodeRepository.save(promoCode);
        return convertToDTO(updatedPromoCode);
    }

    @Override
    public PromoCodeDTO getPromoCodeByCode(String code) {
        PromoCode promoCode = promoCodeRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException(ErrorMessages.PROMO_CODE_NOT_FOUND));
        return convertToDTO(promoCode);
    }

    @Override
    public PageResponseDTO<PromoCodeSummaryDTO> searchPromoCodes(PromoCodeSearchDTO searchDTO) {

        Sort.Direction direction = searchDTO.getSortDirection() != null
                ? Sort.Direction.fromString(searchDTO.getSortDirection().name())
                : Sort.Direction.ASC;

        String sortBy = searchDTO.getSortBy() != null
                ? searchDTO.getSortBy().name().toLowerCase()
                : "code";

        Pageable pageable = PageRequest.of(
                searchDTO.getPage() != null ? searchDTO.getPage() : 0,
                searchDTO.getSize() != null ? searchDTO.getSize() : 10,
                Sort.by(direction, sortBy)
        );

        // TODO: Implementar búsqueda con filtros
        List<PromoCode> promoCodes = promoCodeRepository.findByActiveTrue();
        List<PromoCodeSummaryDTO> filteredCodes = promoCodes.stream()
                .map(this::convertToSummaryDTO)
                .collect(Collectors.toList());

        return PageResponseDTO.<PromoCodeSummaryDTO>builder()
                .content(filteredCodes)
                .currentPage(pageable.getPageNumber())
                .totalPages(1)
                .size(pageable.getPageSize())
                .build();
    }

    @Override
    public void deletePromoCode(String code) {
        if (!promoCodeRepository.existsByCode(code)) {
            throw new IllegalArgumentException("Código promocional no encontrado");
        }
        promoCodeRepository.deleteByCode(code);
    }

    @Override
    public PromoCodeValidationResultDTO validatePromoCode(PromoCodeValidationDTO validationDTO) {
        PromoCode promoCode = promoCodeRepository.findByCode(validationDTO.getPromoCode())
                .orElse(null);

        if (promoCode == null) {
            return PromoCodeValidationResultDTO.builder()
                    .valid(false)
                    .build();
        }

        if (!promoCode.isValid()) {
            return PromoCodeValidationResultDTO.builder()
                    .valid(false)
                    .build();
        }

        if (promoCode.getForDiscountedProductsOnly() && !validationDTO.getHasDiscountedProducts()) {
            return PromoCodeValidationResultDTO.builder()
                    .valid(false)
                    .build();
        }

        double subtotal = validationDTO.getCartItems()
                .stream()
                .mapToDouble(item ->
                        item.getUnitPrice()
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
                                .doubleValue()
                )
                .sum();

        double estimatedDiscount =
                subtotal * (promoCode.getDiscountPercentage() / 100.0);

        return PromoCodeValidationResultDTO.builder()
                .valid(true)
                .applicable(true)
                .promoCode(promoCode.getCode())
                .discountType(PromoDiscountType.PERCENTAGE)
                .discountValue(promoCode.getDiscountPercentage())
                .estimatedDiscountAmount(estimatedDiscount)
                .remainingUses(promoCode.getRemainingUses())
                .expirationDate(promoCode.getExpirationDate())
                .build();
    }

    @Override
    public PromoCodeApplicationResultDTO applyPromoCode(ApplyPromoCodeDTO applyPromoCodeDTO) {

        PromoCode promoCode = promoCodeRepository.findByCode(applyPromoCodeDTO.getPromoCode())
                .orElseThrow(() ->
                        new IllegalArgumentException("Código promocional no encontrado"));

        if (!promoCode.isValid()) {
            return PromoCodeApplicationResultDTO.builder()
                    .success(false)
                    .message("Código promocional no válido")
                    .promoCode(promoCode.getCode())
                    .build();
        }

        Order order = orderRepository.findById(applyPromoCodeDTO.getOrderId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Orden no encontrada"));

        double originalAmount = order.getTotal();

        double discountAmount =
                originalAmount * (promoCode.getDiscountPercentage() / 100.0);

        double finalAmount =
                Math.max(originalAmount - discountAmount, 0);

        if (promoCode.getRemainingUses() != null) {
            promoCode.setRemainingUses(promoCode.getRemainingUses() - 1);
            promoCodeRepository.save(promoCode);
        }

        return PromoCodeApplicationResultDTO.builder()
                .success(true)
                .message("Código promocional aplicado exitosamente")
                .promoCode(promoCode.getCode())
                .discountType(PromoDiscountType.PERCENTAGE)
                .discountApplied(discountAmount)
                .originalAmount(originalAmount)
                .finalAmount(finalAmount)
                .remainingUses(promoCode.getRemainingUses())
                .build();
    }

    @Override
    public List<UserPromoCodeHistoryDTO> getUserPromoCodeHistory(Long userId) {
        // TODO: Implementar historial de uso de códigos promocionales por usuario
        return new ArrayList<>();
    }

    @Override
    public PromoCodeStatsDTO getPromoCodeStats() {
        List<PromoCode> allPromoCodes = promoCodeRepository.findByActiveTrue();
        LocalDateTime now = LocalDateTime.now();

        long totalPromoCodes = allPromoCodes.size();
        long activePromoCodes = allPromoCodes.stream()
                .filter(PromoCode::isValid)
                .count();
        long expiredPromoCodes = allPromoCodes.stream()
                .filter(pc -> pc.getExpirationDate() != null && pc.getExpirationDate().isBefore(now))
                .count();
        long usedPromoCodes = allPromoCodes.stream()
                .filter(pc -> pc.getRemainingUses() != null && pc.getRemainingUses() < Integer.MAX_VALUE)
                .count();

        double averageDiscountPercentage = allPromoCodes.stream()
                .mapToDouble(PromoCode::getDiscountPercentage)
                .average()
                .orElse(0.0);

        Map<String, Integer> topUsedCodes = new HashMap<>(); 
        // TODO: Implementar conteo de usos

        return PromoCodeStatsDTO.builder()
                .totalPromoCodes(totalPromoCodes)
                .activePromoCodes(activePromoCodes)
                .expiredPromoCodes(expiredPromoCodes)

                // Nuevos campos del DTO
                .disabledPromoCodes(
                        allPromoCodes.stream()
                                .filter(pc -> Boolean.FALSE.equals(pc.getActive()))
                                .count()
                )

                .totalUniqueCodesUsed(usedPromoCodes)

                // TODO: implementar cálculo real desde AppliedPromoCode
                .totalApplications(0L)

                // TODO: implementar cálculo monetario real
                .totalDiscountGiven(0.0)

                .averageDiscountValue(averageDiscountPercentage)

                // TODO: implementar agrupación real por tipo
                .promoCodesByType(new HashMap<>())

                .totalDiscountGivenByType(new HashMap<>())

                // Tu DTO ahora espera List<PromoCodeUsageRankingDTO>
                .topUsedCodes(new ArrayList<>())

                .promoCodesExpiringSoon(
                        allPromoCodes.stream()
                                .filter(pc ->
                                        pc.getExpirationDate() != null &&
                                                pc.getExpirationDate().isAfter(now) &&
                                                pc.getExpirationDate().isBefore(now.plusDays(30))
                                )
                                .count()
                )

                .lastCodeCreated(null)

                .build();
    }

    @Override
    public BulkPromoCodeActionResultDTO bulkCreatePromoCodes(BulkCreatePromoCodeDTO bulkCreateDTO) {
        List<String> successfulCodes = new ArrayList<>();
        Map<String, String> failedCodes = new HashMap<>();

        for (CreatePromoCodeDTO dto : bulkCreateDTO.getPromoCodes()) {
            try {
                createPromoCode(dto);
                successfulCodes.add(dto.getCode());
            } catch (Exception e) {
                failedCodes.put(dto.getCode(), e.getMessage());
            }
        }

        return BulkPromoCodeActionResultDTO.builder()
                .action(PromoCodeBulkAction.CREATE)
                .totalCodes(bulkCreateDTO.getPromoCodes().size())
                .successfulActions(successfulCodes.size())
                .failedActions(failedCodes.size())
                .successfulCodes(successfulCodes)
                .failedCodes(failedCodes)
                .summary(InfoMessages.BULK_OPERATION_COMPLETED)
                .build();
    }
    @Override
    public BulkPromoCodeActionResultDTO bulkUpdatePromoCodes(
            BulkPromoCodeActionDTO bulkActionDTO) {

        List<String> successfulCodes = new ArrayList<>();
        Map<String, String> failedCodes = new HashMap<>();

        for (String code : bulkActionDTO.getPromoCodes()) {
            try {

                UpdatePromoCodeDTO updateDTO = UpdatePromoCodeDTO.builder()
                        .active(
                                PromoCodeBulkAction.ACTIVATE.equals(
                                        bulkActionDTO.getAction()
                                )
                        )
                        .build();

                updatePromoCode(code, updateDTO);

                successfulCodes.add(code);

            } catch (Exception e) {

                failedCodes.put(code, e.getMessage());
            }
        }

        return BulkPromoCodeActionResultDTO.builder()
                .action(bulkActionDTO.getAction())
                .totalCodes(bulkActionDTO.getPromoCodes().size())
                .successfulActions(successfulCodes.size())
                .failedActions(failedCodes.size())
                .successfulCodes(successfulCodes)
                .failedCodes(failedCodes)
                .summary(InfoMessages.BULK_OPERATION_COMPLETED)
                .build();
    }

    @Override
    public BulkPromoCodeActionResultDTO bulkDeletePromoCodes(BulkPromoCodeActionDTO bulkActionDTO) {
        List<String> successfulCodes = new ArrayList<>();
        Map<String, String> failedCodes = new HashMap<>();

        for (String code : bulkActionDTO.getPromoCodes()) {
            try {
                deletePromoCode(code);
                successfulCodes.add(code);
            } catch (Exception e) {
                failedCodes.put(code, e.getMessage());
            }
        }

        return BulkPromoCodeActionResultDTO.builder()
                .action(PromoCodeBulkAction.DELETE)
                .totalCodes(bulkActionDTO.getPromoCodes().size())
                .successfulActions(successfulCodes.size())
                .failedActions(failedCodes.size())
                .successfulCodes(successfulCodes)
                .failedCodes(failedCodes)
                .summary(InfoMessages.BULK_OPERATION_COMPLETED)
                .build();
    }

    private PromoCodeDTO convertToDTO(PromoCode promoCode) {

        return PromoCodeDTO.builder()
                .code(promoCode.getCode())

                // Tu entidad actual solo maneja porcentaje
                .discountType(PromoDiscountType.PERCENTAGE)

                .discountValue(promoCode.getDiscountPercentage())

                .expirationDate(promoCode.getExpirationDate())

                .active(promoCode.getActive())

                .remainingUses(promoCode.getRemainingUses())

                // Tu entidad NO tiene estos campos todavía
                .maxUses(null)

                .minimumOrderAmount(null)

                .appliesToDiscountedProducts(
                        promoCode.getForDiscountedProductsOnly()
                )

                // Tu entidad actual tampoco tiene timestamps
                .createdAt(null)

                .updatedAt(null)

                .build();
    }

    private PromoCodeSummaryDTO convertToSummaryDTO(PromoCode promoCode) {

        return PromoCodeSummaryDTO.builder()
                .code(promoCode.getCode())

                // Tu entidad actual solo soporta porcentaje
                .discountType(PromoDiscountType.PERCENTAGE)

                .discountValue(promoCode.getDiscountPercentage())

                .expirationDate(promoCode.getExpirationDate())

                .active(promoCode.getActive())

                .timesUsed(
                        promoCode.getAppliedPromoCodes() != null
                                ? promoCode.getAppliedPromoCodes().size()
                                : 0
                )

                .remainingUses(promoCode.getRemainingUses())

                .expired(
                        promoCode.getExpirationDate() != null
                                && promoCode.getExpirationDate()
                                .isBefore(LocalDateTime.now())
                )

                .build();
    }
} 