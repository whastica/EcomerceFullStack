package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.common.InfoMessages;
import com.whalensoft.astrosetupsback.application.common.ErrorMessages;
import com.whalensoft.astrosetupsback.application.dto.Promotion.*;
import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.interfaces.PromotionService;
import com.whalensoft.astrosetupsback.domain.model.PromoCode;
import com.whalensoft.astrosetupsback.domain.repository.PromoCodeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class PromotionServiceImpl implements PromotionService {

    private final PromoCodeRepository promoCodeRepository;

    public PromotionServiceImpl(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }

    @Override
    public PromoCodeDTO createPromoCode(CreatePromoCodeDTO createPromoCodeDTO) {
        if (promoCodeRepository.existsByCode(createPromoCodeDTO.getCode())) {
            throw new IllegalArgumentException("El código promocional ya existe");
        }

        PromoCode promoCode = PromoCode.builder()
                .code(createPromoCodeDTO.getCode())
                .discountPercentage(createPromoCodeDTO.getDiscountPercentage())
                .expirationDate(createPromoCodeDTO.getExpirationDate())
                .remainingUses(createPromoCodeDTO.getRemainingUses())
                .forDiscountedProductsOnly(createPromoCodeDTO.getForDiscountedProductsOnly())
                .active(createPromoCodeDTO.getActive())
                .build();

        PromoCode savedPromoCode = promoCodeRepository.save(promoCode);
        return convertToDTO(savedPromoCode);
    }

    @Override
    public PromoCodeDTO updatePromoCode(Long id, UpdatePromoCodeDTO updatePromoCodeDTO) {
        PromoCode promoCode = promoCodeRepository.findByCode(id.toString())
                .orElseThrow(() -> new RuntimeException(ErrorMessages.PROMO_CODE_NOT_FOUND));

        if (updatePromoCodeDTO.getDiscountPercentage() != null) {
            promoCode.setDiscountPercentage(updatePromoCodeDTO.getDiscountPercentage());
        }
        if (updatePromoCodeDTO.getExpirationDate() != null) {
            promoCode.setExpirationDate(updatePromoCodeDTO.getExpirationDate());
        }
        if (updatePromoCodeDTO.getRemainingUses() != null) {
            promoCode.setRemainingUses(updatePromoCodeDTO.getRemainingUses());
        }
        if (updatePromoCodeDTO.getForDiscountedProductsOnly() != null) {
            promoCode.setForDiscountedProductsOnly(updatePromoCodeDTO.getForDiscountedProductsOnly());
        }
        if (updatePromoCodeDTO.getActive() != null) {
            promoCode.setActive(updatePromoCodeDTO.getActive());
        }

        PromoCode updatedPromoCode = promoCodeRepository.save(promoCode);
        return convertToDTO(updatedPromoCode);
    }

    @Override
    public PromoCodeDTO getPromoCodeById(Long id) {
        PromoCode promoCode = promoCodeRepository.findByCode(id.toString())
                .orElseThrow(() -> new RuntimeException(ErrorMessages.PROMO_CODE_NOT_FOUND));
        return convertToDTO(promoCode);
    }

    @Override
    public PageResponseDTO<PromoCodeSummaryDTO> searchPromoCodes(PromoCodeSearchDTO searchDTO) {
        Pageable pageable = PageRequest.of(
                searchDTO.getPage() != null ? searchDTO.getPage() : 0,
                searchDTO.getSize() != null ? searchDTO.getSize() : 10,
                Sort.by(Sort.Direction.fromString(
                        searchDTO.getSortDirection() != null ? searchDTO.getSortDirection() : "ASC"),
                        searchDTO.getSortBy() != null ? searchDTO.getSortBy() : "code"
                )
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
    public void deletePromoCode(Long id) {
        if (!promoCodeRepository.existsByCode(id.toString())) {
            throw new IllegalArgumentException("Código promocional no encontrado");
        }
        promoCodeRepository.deleteByCode(id.toString());
    }

    @Override
    public PromoCodeValidationResultDTO validatePromoCode(PromoCodeValidationDTO validationDTO) {
        PromoCode promoCode = promoCodeRepository.findByCode(validationDTO.getPromoCode())
                .orElse(null);

        if (promoCode == null) {
            return PromoCodeValidationResultDTO.builder()
                    .isValid(false)
                    .message("Código promocional no encontrado")
                    .promoCode(validationDTO.getPromoCode())
                    .build();
        }

        if (!promoCode.isValid()) {
            return PromoCodeValidationResultDTO.builder()
                    .isValid(false)
                    .message("Código promocional no válido")
                    .promoCode(promoCode.getCode())
                    .build();
        }

        if (promoCode.getForDiscountedProductsOnly() && !validationDTO.getHasDiscountedProducts()) {
            return PromoCodeValidationResultDTO.builder()
                    .isValid(false)
                    .message("Este código solo es válido para productos con descuento")
                    .promoCode(promoCode.getCode())
                    .build();
        }

        double estimatedDiscount = validationDTO.getSubtotal() * (promoCode.getDiscountPercentage() / 100.0);

        return PromoCodeValidationResultDTO.builder()
                .isValid(true)
                .message("Código promocional válido")
                .promoCode(promoCode.getCode())
                .discountPercentage(promoCode.getDiscountPercentage())
                .estimatedDiscount(estimatedDiscount)
                .canBeApplied(true)
                .build();
    }

    @Override
    public PromoCodeApplicationResultDTO applyPromoCode(ApplyPromoCodeDTO applyPromoCodeDTO) {
        PromoCode promoCode = promoCodeRepository.findByCode(applyPromoCodeDTO.getPromoCode())
                .orElseThrow(() -> new IllegalArgumentException("Código promocional no encontrado"));

        if (!promoCode.isValid()) {
            return PromoCodeApplicationResultDTO.builder()
                    .success(false)
                    .message("Código promocional no válido")
                    .promoCode(promoCode.getCode())
                    .build();
        }

        double discountAmount = applyPromoCodeDTO.getSubtotal() * (promoCode.getDiscountPercentage() / 100.0);
        double finalAmount = applyPromoCodeDTO.getSubtotal() - discountAmount;

        if (promoCode.getRemainingUses() != null) {
            promoCode.setRemainingUses(promoCode.getRemainingUses() - 1);
            promoCodeRepository.save(promoCode);
        }

        return PromoCodeApplicationResultDTO.builder()
                .success(true)
                .message("Código promocional aplicado exitosamente")
                .promoCode(promoCode.getCode())
                .discountPercentage(promoCode.getDiscountPercentage())
                .discountAmount(discountAmount)
                .originalAmount(applyPromoCodeDTO.getSubtotal())
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
                .usedPromoCodes(usedPromoCodes)
                .averageDiscountPercentage(averageDiscountPercentage)
                .topUsedCodes(topUsedCodes)
                .build();
    }

    @Override
    public BulkPromoCodeActionResultDTO bulkCreatePromoCodes(BulkPromoCodeActionDTO bulkActionDTO) {
        List<String> successfulCodes = new ArrayList<>();
        Map<String, String> failedCodes = new HashMap<>();

        for (String code : bulkActionDTO.getPromoCodes()) {
            try {
                CreatePromoCodeDTO createDTO = CreatePromoCodeDTO.builder()
                        .code(code)
                        .discountPercentage(10.0) 
                        // TODO: Hacer configurable
                        .active(true)
                        .build();
                createPromoCode(createDTO);
                successfulCodes.add(code);
            } catch (Exception e) {
                failedCodes.put(code, e.getMessage());
            }
        }

        return BulkPromoCodeActionResultDTO.builder()
                .action("CREATE")
                .totalCodes(bulkActionDTO.getPromoCodes().size())
                .successfulActions(successfulCodes.size())
                .failedActions(failedCodes.size())
                .successfulCodes(successfulCodes)
                .failedCodes(failedCodes)
                .message(InfoMessages.BULK_OPERATION_COMPLETED)
                .build();
    }

    @Override
    public BulkPromoCodeActionResultDTO bulkUpdatePromoCodes(BulkPromoCodeActionDTO bulkActionDTO) {
        List<String> successfulCodes = new ArrayList<>();
        Map<String, String> failedCodes = new HashMap<>();

        for (String code : bulkActionDTO.getPromoCodes()) {
            try {
                UpdatePromoCodeDTO updateDTO = UpdatePromoCodeDTO.builder()
                        .active("ACTIVATE".equals(bulkActionDTO.getAction()))
                        .build();
                updatePromoCode(Long.parseLong(code), updateDTO);
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
                .message(InfoMessages.BULK_OPERATION_COMPLETED)
                .build();
    }

    @Override
    public BulkPromoCodeActionResultDTO bulkDeletePromoCodes(BulkPromoCodeActionDTO bulkActionDTO) {
        List<String> successfulCodes = new ArrayList<>();
        Map<String, String> failedCodes = new HashMap<>();

        for (String code : bulkActionDTO.getPromoCodes()) {
            try {
                deletePromoCode(Long.parseLong(code));
                successfulCodes.add(code);
            } catch (Exception e) {
                failedCodes.put(code, e.getMessage());
            }
        }

        return BulkPromoCodeActionResultDTO.builder()
                .action("DELETE")
                .totalCodes(bulkActionDTO.getPromoCodes().size())
                .successfulActions(successfulCodes.size())
                .failedActions(failedCodes.size())
                .successfulCodes(successfulCodes)
                .failedCodes(failedCodes)
                .message(InfoMessages.BULK_OPERATION_COMPLETED)
                .build();
    }

    private PromoCodeDTO convertToDTO(PromoCode promoCode) {
        return PromoCodeDTO.builder()
                .code(promoCode.getCode())
                .discountPercentage(promoCode.getDiscountPercentage())
                .expirationDate(promoCode.getExpirationDate())
                .remainingUses(promoCode.getRemainingUses())
                .forDiscountedProductsOnly(promoCode.getForDiscountedProductsOnly())
                .active(promoCode.getActive())
                .isValid(promoCode.isValid())
                .isExpired(promoCode.getExpirationDate() != null && 
                          promoCode.getExpirationDate().isBefore(LocalDateTime.now()))
                .timesUsed(promoCode.getAppliedPromoCodes().size())
                .build();
    }

    private PromoCodeSummaryDTO convertToSummaryDTO(PromoCode promoCode) {
        return PromoCodeSummaryDTO.builder()
                .code(promoCode.getCode())
                .discountPercentage(promoCode.getDiscountPercentage())
                .expirationDate(promoCode.getExpirationDate())
                .active(promoCode.getActive())
                .isValid(promoCode.isValid())
                .timesUsed(promoCode.getAppliedPromoCodes().size())
                .remainingUses(promoCode.getRemainingUses())
                .build();
    }
} 