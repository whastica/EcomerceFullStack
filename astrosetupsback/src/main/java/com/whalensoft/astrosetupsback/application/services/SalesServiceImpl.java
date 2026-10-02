package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.AddToCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.MigrateCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.ShoppingCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.UpdateCartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.CheckoutSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ProcessCheckoutDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.*;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.SalesSeriesDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.SalesStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.interfaces.SalesService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class SalesServiceImpl implements SalesService {

    private final OrderRepository orderRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PromoCodeRepository promoCodeRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final com.whalensoft.astrosetupsback.infra.repository.JpaOrderStatusHistoryRepository orderStatusHistoryRepository;

    public SalesServiceImpl(
            OrderRepository orderRepository,
            ShoppingCartRepository shoppingCartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            PromoCodeRepository promoCodeRepository,
            ShippingAddressRepository shippingAddressRepository,
            com.whalensoft.astrosetupsback.infra.repository.JpaOrderStatusHistoryRepository orderStatusHistoryRepository) {
        this.orderRepository = orderRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.promoCodeRepository = promoCodeRepository;
        this.shippingAddressRepository = shippingAddressRepository;
        this.orderStatusHistoryRepository = orderStatusHistoryRepository;
    }

    // =========================================================
    // ÓRDENES
    // =========================================================

    @Override
    public OrderDTO createOrder(CreateOrderDTO createOrderDTO) {
        validateCreateOrderData(createOrderDTO);

        User user = null;
        ShippingAddress shippingAddress = null;

        if (createOrderDTO.getUserId() != null) {
            user = userRepository.findById(createOrderDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }

        if (createOrderDTO.getShippingAddressId() != null) {
            shippingAddress = shippingAddressRepository.findById(createOrderDTO.getShippingAddressId())
                    .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));
        }

        List<OrderItem> orderItems = createOrderDTO.getOrderItems().stream()
                .map(this::createOrderItem)
                .collect(Collectors.toList());

        double subtotal = orderItems.stream()
                .mapToDouble(OrderItem::getSubtotal)
                .sum();

        double totalDiscount = 0.0;
        if (createOrderDTO.getPromoCodes() != null && !createOrderDTO.getPromoCodes().isEmpty()) {
            for (String code : createOrderDTO.getPromoCodes()) {
                PromoCode promoCode = promoCodeRepository.findByCode(code).orElse(null);
                if (promoCode != null && promoCode.getActive()) {
                    totalDiscount += (subtotal * promoCode.getDiscountPercentage()) / 100.0;
                }
            }
        }

        double total = subtotal - totalDiscount;

        Order order = Order.builder()
                .user(user)
                .total(total)
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .paymentMethod(createOrderDTO.getPaymentMethod())
                .shippingAddress(shippingAddress)
                .orderItems(orderItems)
                .appliedPromoCodes(new ArrayList<>())
                .build();

        orderItems.forEach(item -> item.setOrder(order));

        Order savedOrder = orderRepository.save(order);

        // Create AppliedPromoCodes AFTER saving the order so orderId is not null
        if (createOrderDTO.getPromoCodes() != null && !createOrderDTO.getPromoCodes().isEmpty()) {
            List<AppliedPromoCode> appliedPromoCodes = new ArrayList<>();
            for (String code : createOrderDTO.getPromoCodes()) {
                PromoCode promoCode = promoCodeRepository.findByCode(code).orElse(null);
                if (promoCode != null && promoCode.getActive()) {
                    AppliedPromoCodeId compositeId = new AppliedPromoCodeId(
                            code,
                            user != null ? user.getId() : null,
                            savedOrder.getId()
                    );
                    AppliedPromoCode appliedCode = AppliedPromoCode.builder()
                            .id(compositeId)
                            .promoCodeRef(promoCode)
                            .user(user)
                            .order(savedOrder)
                            .applicationDate(LocalDateTime.now())
                            .build();
                    appliedPromoCodes.add(appliedCode);

                    // Decrement remaining uses
                    if (promoCode.getRemainingUses() != null) {
                        promoCode.setRemainingUses(promoCode.getRemainingUses() - 1);
                        promoCodeRepository.save(promoCode);
                    }
                }
            }
            savedOrder.setAppliedPromoCodes(appliedPromoCodes);
            orderRepository.save(savedOrder);
        }

        return convertToOrderDTO(savedOrder);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        return convertToOrderDTO(order);
    }

    @Override
    public OrderSearchResultDTO searchOrders(OrderSearchDTO searchDTO) {
        Sort sort = createSort(searchDTO.getSortBy(), searchDTO.getSortDirection());

        int page = (searchDTO.getPage() == null) ? 0 : Math.max(0, searchDTO.getPage());
        int size = (searchDTO.getSize() == null) ? 20
                : Math.min(Math.max(1, searchDTO.getSize()), 100);
        Pageable pageable = PageRequest.of(page, size, sort);

        String searchTerm = emptyToNull(searchDTO.getSearchTerm());
        Long orderId = searchDTO.getOrderId();

        // Un término 100% numérico se interpreta como ID de orden
        if (searchTerm != null && orderId == null && searchTerm.matches("\\d+")) {
            orderId = Long.parseLong(searchTerm);
            searchTerm = null;
        }

        Page<Order> ordersPage = orderRepository.searchOrders(
                searchDTO.getStatus(),
                searchDTO.getPaymentMethod(),
                searchDTO.getUserId(),
                orderId,
                searchDTO.getStartDate(),
                searchDTO.getEndDate(),
                searchDTO.getMinTotal(),
                searchDTO.getMaxTotal(),
                emptyToNull(searchDTO.getCustomerEmail()),
                emptyToNull(searchDTO.getCustomerName()),
                searchTerm,
                pageable
        );

        List<OrderSummaryDTO> summaries = ordersPage.getContent().stream()
                .map(this::convertToOrderSummaryDTO)
                .collect(Collectors.toList());

        return OrderSearchResultDTO.builder()
                .orders(summaries)
                .totalElements(ordersPage.getTotalElements())
                .totalPages(ordersPage.getTotalPages())
                .currentPage(ordersPage.getNumber())
                .pageSize(ordersPage.getSize())
                .hasNext(ordersPage.hasNext())
                .hasPrevious(ordersPage.hasPrevious())
                .build();
    }

    @Override
    public OrderDTO updateOrderStatus(Long id, UpdateOrderStatusDTO updateStatusDTO) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        OrderStatus previousStatus = order.getStatus();
        validateStatusTransition(previousStatus, updateStatusDTO.getStatus());
        order.setStatus(updateStatusDTO.getStatus());

        Order updatedOrder = orderRepository.save(order);

        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(updatedOrder)
                .previousStatus(previousStatus)
                .newStatus(updateStatusDTO.getStatus())
                .observation(updateStatusDTO.getObservation())
                .build();
        orderStatusHistoryRepository.save(history);

        return convertToOrderDTO(updatedOrder);
    }

    @Override
    public List<OrderStatusHistoryDTO> getOrderStatusHistory(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        return orderStatusHistoryRepository.findByOrderOrderByChangedAtAsc(order)
                .stream()
                .map(h -> OrderStatusHistoryDTO.builder()
                        .status(h.getNewStatus())
                        .timestamp(h.getChangedAt())
                        .observation(h.getObservation() != null ? h.getObservation() : "")
                        .build())
                .toList();
    }

    @Override
    public OrderTrackingDTO getOrderTracking(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        List<OrderStatusHistoryDTO> history = orderStatusHistoryRepository.findByOrderOrderByChangedAtAsc(order)
                .stream()
                .map(h -> OrderStatusHistoryDTO.builder()
                        .status(h.getNewStatus())
                        .timestamp(h.getChangedAt())
                        .observation(h.getObservation() != null ? h.getObservation() : "")
                        .build())
                .toList();

        return OrderTrackingDTO.builder()
                .orderId(order.getId())
                .currentStatus(order.getStatus())
                .orderDate(order.getOrderDate())
                .estimatedDelivery(calculateEstimatedDelivery(order.getOrderDate()))
                .statusHistory(history)
                .shippingAddress(convertToShippingAddressDTO(order.getShippingAddress()))
                .build();
    }

    @Override
    public List<OrderSummaryDTO> getCustomerOrders(Long customerId) {
        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        return orderRepository.findByUser(user).stream()
                .map(this::convertToOrderSummaryDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Long getOrderUserId(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        return order.getUser().getId();
    }

    // =========================================================
    // CARRITO
    // =========================================================

    @Override
    public ShoppingCartDTO getShoppingCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseGet(() -> createNewShoppingCart(user));

        return convertToShoppingCartDTO(cart);
    }

    @Override
    public CartItemDTO addToCart(AddToCartDTO addToCartDTO) {
        Product product = productRepository.findById(addToCartDTO.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));

        if (!product.getActive()) {
            throw new IllegalStateException("El producto no está disponible");
        }

        if (product.getStock() <= 0) {
            throw new IllegalStateException("El producto no tiene stock disponible");
        }

        ShoppingCart cart;

        if (addToCartDTO.getUserId() != null) {
            User user = userRepository.findById(addToCartDTO.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
            cart = shoppingCartRepository.findByUser(user)
                    .orElseGet(() -> createNewShoppingCart(user));
        } else {
            cart = resolveGuestCart(addToCartDTO.getGuestCartId());
        }

        Optional<CartItem> existingItem =
                cartItemRepository.findByShoppingCartAndProduct(cart, product);

        CartItem cartItem;

        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            int newQuantity = cartItem.getQuantity() + addToCartDTO.getQuantity();

            if (newQuantity > product.getStock()) {
                throw new IllegalStateException(
                        "Stock insuficiente. Disponible: " + product.getStock());
            }
            cartItem.setQuantity(newQuantity);
        } else {
            if (addToCartDTO.getQuantity() > product.getStock()) {
                throw new IllegalStateException(
                        "Stock insuficiente. Disponible: " + product.getStock());
            }
            cartItem = CartItem.builder()
                    .shoppingCart(cart)
                    .product(product)
                    .productName(product.getName())
                    .quantity(addToCartDTO.getQuantity())
                    .unitPrice(product.getEffectivePrice())
                    .build();
        }

        CartItem savedItem = cartItemRepository.save(cartItem);
        return convertToCartItemDTO(savedItem);
    }

    @Override
    public CartItemDTO updateCartItem(Long cartItemId, UpdateCartItemDTO dto) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new EntityNotFoundException("Item del carrito no encontrado"));

        int newQuantity = Boolean.FALSE.equals(dto.getReplace())
                ? cartItem.getQuantity() + dto.getQuantity()
                : dto.getQuantity();

        Product product = cartItem.getProduct();
        if (newQuantity > product.getStock()) {
            throw new IllegalStateException(
                    "Stock insuficiente. Disponible: " + product.getStock());
        }

        cartItem.setQuantity(newQuantity);
        CartItem updated = cartItemRepository.save(cartItem);
        return convertToCartItemDTO(updated);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            throw new EntityNotFoundException("Item del carrito no encontrado");
        }
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public CartSummaryDTO getCartSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        ShoppingCart cart = shoppingCartRepository.findByUser(user).orElse(null);

        if (cart == null || cart.getCartItems().isEmpty()) {
            return CartSummaryDTO.builder()
                    .id(null)
                    .subtotal(BigDecimal.ZERO)
                    .totalDiscount(BigDecimal.ZERO)
                    .total(BigDecimal.ZERO)
                    .totalItems(0)
                    .distinctItems(0)
                    .expired(false)
                    .expiresAt(null)
                    .hasAppliedPromoCode(false)
                    .build();
        }

        BigDecimal subtotal = cart.getTotal();
        int totalItems = cart.getCartItems().stream().mapToInt(CartItem::getQuantity).sum();
        int distinctItems = cart.getCartItems().size();

        return CartSummaryDTO.builder()
                .id(cart.getId())
                .subtotal(subtotal)
                .totalDiscount(BigDecimal.ZERO)
                .total(subtotal)
                .totalItems(totalItems)
                .distinctItems(distinctItems)
                .expired(cart.isExpired())
                .expiresAt(cart.getExpiration())
                .hasAppliedPromoCode(false)
                .build();
    }

    @Override
    public ShoppingCartDTO getGuestCart(String guestCartId) {
        ShoppingCart cart = resolveGuestCart(guestCartId);
        return convertToShoppingCartDTO(cart);
    }

    @Override
    public ShoppingCartDTO migrateGuestCart(MigrateCartDTO migrateCartDTO) {
        User user = userRepository.findById(migrateCartDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        ShoppingCart guestCart = resolveGuestCart(migrateCartDTO.getGuestCartId());

        if (guestCart.isExpired() || guestCart.getCartItems().isEmpty()) {
            ShoppingCart userCart = shoppingCartRepository.findByUser(user)
                    .orElseGet(() -> createNewShoppingCart(user));
            return convertToShoppingCartDTO(userCart);
        }

        ShoppingCart userCart = shoppingCartRepository.findByUser(user)
                .orElseGet(() -> createNewShoppingCart(user));

        for (CartItem guestItem : guestCart.getCartItems()) {
            Optional<CartItem> existingItem = cartItemRepository
                    .findByShoppingCartAndProduct(userCart, guestItem.getProduct());

            if (existingItem.isPresent()) {
                CartItem item = existingItem.get();
                item.setQuantity(item.getQuantity() + guestItem.getQuantity());
                cartItemRepository.save(item);
            } else {
                CartItem newItem = CartItem.builder()
                        .shoppingCart(userCart)
                        .product(guestItem.getProduct())
                        .productName(guestItem.getProductName())
                        .quantity(guestItem.getQuantity())
                        .unitPrice(guestItem.getUnitPrice())
                        .build();
                cartItemRepository.save(newItem);
            }
        }

        cartItemRepository.deleteByShoppingCart(guestCart);
        shoppingCartRepository.deleteById(guestCart.getId());

        return convertToShoppingCartDTO(userCart);
    }

    // =========================================================
    // CHECKOUT Y PROMOCIONES
    // =========================================================

    @Override
    public CheckoutSummaryDTO processCheckout(ProcessCheckoutDTO checkoutDTO) {

        if (!Boolean.TRUE.equals(checkoutDTO.getAcceptedTerms())) {
            throw new IllegalStateException(
                    "Debes aceptar los términos y condiciones"
            );
        }

        ShoppingCart cart = shoppingCartRepository.findById(
                checkoutDTO.getCartId()
        ).orElseThrow(() ->
                new EntityNotFoundException("Carrito no encontrado")
        );

        if (cart.isExpired()) {
            throw new IllegalStateException(
                    "El carrito ha expirado"
            );
        }

        if (cart.getCartItems().isEmpty()) {
            throw new IllegalStateException(
                    "El carrito está vacío"
            );
        }

        BigDecimal subtotal = cart.getTotal();

        BigDecimal discount = BigDecimal.ZERO;

        if (checkoutDTO.getPromoCode() != null
                && !checkoutDTO.getPromoCode().isBlank()) {

            PromoCode promoCode = promoCodeRepository
                    .findByCode(checkoutDTO.getPromoCode())
                    .orElseThrow(() ->
                            new EntityNotFoundException(
                                    "Código promocional no encontrado"
                            )
                    );

            if (!promoCode.isValid()) {
                throw new IllegalStateException(
                        "Código promocional inválido"
                );
            }

            BigDecimal percentage =
                    BigDecimal.valueOf(
                            promoCode.getDiscountPercentage()
                    );

            discount = subtotal.multiply(
                    percentage.divide(BigDecimal.valueOf(100))
            );
        }

        BigDecimal total = subtotal.subtract(discount);

        return CheckoutSummaryDTO.builder()
                .subtotal(subtotal)
                .totalDiscount(discount)
                .total(total)
                .totalItems(
                        cart.getCartItems()
                                .stream()
                                .mapToInt(CartItem::getQuantity)
                                .sum()
                )
                .build();
    }

    @Override
    public PromoCodeValidationResultDTO validatePromoCode(
            PromoCodeValidationDTO validationDTO
    ) {

        PromoCode promoCode = promoCodeRepository
                .findByCode(validationDTO.getPromoCode())
                .orElse(null);

        if (promoCode == null) {

            return PromoCodeValidationResultDTO.builder()
                    .valid(false)
                    .applicable(false)
                    .promoCode(validationDTO.getPromoCode())
                    .validationMessages(
                            List.of("Código promocional no encontrado")
                    )
                    .build();
        }

        if (!promoCode.isValid()) {

            return PromoCodeValidationResultDTO.builder()
                    .valid(false)
                    .applicable(false)
                    .promoCode(promoCode.getCode())
                    .validationMessages(
                            List.of("Código promocional inválido")
                    )
                    .build();
        }

        BigDecimal subtotal = validationDTO.getCartItems()
                .stream()
                .map(CartItemDTO::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount =
                subtotal.multiply(
                        BigDecimal.valueOf(
                                promoCode.getDiscountPercentage()
                        ).divide(BigDecimal.valueOf(100))
                );

        return PromoCodeValidationResultDTO.builder()
                .valid(true)
                .applicable(true)
                .promoCode(promoCode.getCode())
                .discountValue(promoCode.getDiscountPercentage())
                .estimatedDiscountAmount(discount.doubleValue())
                .remainingUses(promoCode.getRemainingUses())
                .expirationDate(promoCode.getExpirationDate())
                .validationMessages(
                        List.of("Código promocional válido")
                )
                .build();
    }

    @Override
    public SalesStatsDTO getSalesStats() {
        Long pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);
        Long shippedOrders = orderRepository.countByStatus(OrderStatus.SHIPPED);
        Long deliveredOrders = orderRepository.countByStatus(OrderStatus.DELIVERED);
        Long cancelledOrders = orderRepository.countByStatus(OrderStatus.CANCELLED);

        List<Order> allOrders = orderRepository.findAll(Pageable.unpaged()).getContent();
        Long totalOrders = (long) allOrders.size();

        Double totalRevenue = allOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                .mapToDouble(Order::getTotal)
                .sum();

        Double averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0.0;

        Long totalCustomers = allOrders.stream()
                .map(Order::getUser)
                .filter(Objects::nonNull)
                .distinct()
                .count();

        return SalesStatsDTO.builder()
                .totalOrders(totalOrders)
                .ordersPending(pendingOrders)
                .ordersShipped(shippedOrders)
                .ordersDelivered(deliveredOrders)
                .ordersCancelled(cancelledOrders)
                .totalRevenue(BigDecimal.valueOf(totalRevenue)) // Conversión de Double a BigDecimal
                .averageOrderValue(BigDecimal.valueOf(averageOrderValue)) // Asumiendo que averageOrderValue también es Double
                .totalCustomers(totalCustomers)
                .build();
    }

    @Override
    public SalesSeriesDTO getSalesSeries(String period) {
        String normalizedPeriod = (period == null || period.isBlank())
                ? "7d" : period.trim().toLowerCase();

        int days = switch (normalizedPeriod) {
            case "7d" -> 7;
            case "30d" -> 30;
            case "90d" -> 90;
            default -> throw new IllegalArgumentException(
                    "Periodo inválido: use 7d, 30d o 90d"
            );
        };

        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(days - 1L);

        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = today.plusDays(1).atStartOfDay().minusNanos(1);

        List<Order> orders = orderRepository.findByOrderDateBetween(startDateTime, endDateTime);

        Map<LocalDate, long[]> countsByDay = new LinkedHashMap<>();
        for (LocalDate day = start; !day.isAfter(today); day = day.plusDays(1)) {
            countsByDay.put(day, new long[]{0L, 0L});
        }

        DateTimeFormatter labelFormatter = DateTimeFormatter.ofPattern("dd/MM");

        for (Order order : orders) {
            if (order.getOrderDate() == null) continue;
            long[] point = countsByDay.get(order.getOrderDate().toLocalDate());
            if (point == null) continue;
            point[0] += 1;
            point[1] += Math.round(order.getTotal() * 100.0);
        }

        List<SalesSeriesDTO.SeriesPoint> points = countsByDay.entrySet().stream()
                .map(entry -> SalesSeriesDTO.SeriesPoint.builder()
                        .date(entry.getKey())
                        .label(entry.getKey().format(labelFormatter))
                        .orders(entry.getValue()[0])
                        .revenue(entry.getValue()[1] / 100.0)
                        .build())
                .collect(Collectors.toList());

        return SalesSeriesDTO.builder()
                .period(normalizedPeriod)
                .days(days)
                .points(points)
                .build();
    }

    // =========================================================
    // MÉTODOS AUXILIARES PRIVADOS
    // =========================================================

    private void validateCreateOrderData(CreateOrderDTO createOrderDTO) {
        if (createOrderDTO.getOrderItems() == null || createOrderDTO.getOrderItems().isEmpty()) {
            throw new RuntimeException("La orden debe tener al menos un item");
        }
        if (createOrderDTO.getPaymentMethod() == null) {
            throw new RuntimeException("El método de pago es obligatorio");
        }
        if (createOrderDTO.getShippingAddressId() == null
                && createOrderDTO.getGuestShippingAddress() == null) {
            throw new RuntimeException("Se requiere una dirección de envío");
        }
    }

    private OrderItem createOrderItem(
            CreateOrderItemDTO dto
    ) {

        Product product = productRepository.findById(
                dto.getProductId()
        ).orElseThrow(() ->
                new EntityNotFoundException("Producto no encontrado")
        );

        double finalPrice =
                product.getEffectivePrice().doubleValue();

        return OrderItem.builder()
                .product(product)
                .productName(product.getName())
                .quantity(dto.getQuantity())
                .finalPrice(finalPrice)
                .subtotal(finalPrice * dto.getQuantity())
                .build();
    }

    private List<AppliedPromoCode> applyPromoCodesToOrder(
            List<String> promoCodes, double subtotal, User user) {
        List<AppliedPromoCode> appliedCodes = new ArrayList<>();

        for (String code : promoCodes) {
            PromoCode promoCode = promoCodeRepository.findByCode(code).orElse(null);
            if (promoCode != null && promoCode.getActive()) {

                // 1. Crear la ID compuesta manualmente (no tiene @Builder)
                AppliedPromoCodeId compositeId = new AppliedPromoCodeId(
                        code,
                        user != null ? user.getId() : null,
                        null // orderId es null inicialmente
                );

                // 2. Construir la entidad con los nombres de campos correctos
                AppliedPromoCode appliedCode = AppliedPromoCode.builder()
                        .id(compositeId)
                        .promoCodeRef(promoCode) // Corregido: antes era .promoCodeEntity
                        .user(user)
                        .order(null)
                        .applicationDate(LocalDateTime.now())
                        .build();

                appliedCodes.add(appliedCode);
            }
        }
        return appliedCodes;
    }

    private double calculateTotalDiscountFromPromoCodes(
            List<AppliedPromoCode> appliedPromoCodes, double subtotal) {
        double totalDiscount = 0.0;
        for (AppliedPromoCode apc : appliedPromoCodes) {
            totalDiscount += (subtotal * apc.getPromoCodeEntity().getDiscountPercentage()) / 100.0;
        }
        return totalDiscount;
    }

    private ShoppingCart resolveGuestCart(String guestCartId) {
        if (guestCartId == null || guestCartId.isBlank()) {
            ShoppingCart guestCart = ShoppingCart.builder()
                    .user(null)
                    .expiration(LocalDateTime.now().plusHours(24))
                    .build();
            return shoppingCartRepository.save(guestCart);
        }

        try {
            Long cartId = Long.parseLong(guestCartId);
            return shoppingCartRepository.findById(cartId)
                    .filter(cart -> !cart.isExpired())
                    .orElseGet(() -> shoppingCartRepository.save(
                            ShoppingCart.builder()
                                    .user(null)
                                    .expiration(LocalDateTime.now().plusHours(24))
                                    .build()
                    ));
        } catch (NumberFormatException e) {
            return shoppingCartRepository.save(
                    ShoppingCart.builder()
                            .user(null)
                            .expiration(LocalDateTime.now().plusHours(24))
                            .build()
            );
        }
    }

    private ShoppingCart createNewShoppingCart(User user) {
        ShoppingCart cart = ShoppingCart.builder()
                .user(user)
                .expiration(LocalDateTime.now().plusHours(24))
                .build();
        return shoppingCartRepository.save(cart);
    }

    private void validateCheckoutData(ProcessCheckoutDTO checkoutDTO) {
        // En el nuevo DTO, el usuario se determina por la presencia de guestUser
        // o se asume autenticado si no es invitado.
        // Si necesitas validar que al menos exista un identificador de destino:
        if (checkoutDTO.getGuestUser() == null && checkoutDTO.getShippingAddressId() == null) {
            throw new RuntimeException("Debe proporcionar una dirección de envío o datos de invitado");
        }

        // El método de pago ahora está en la raíz
        if (checkoutDTO.getPaymentMethod() == null) {
            throw new RuntimeException("Método de pago es obligatorio");
        }
    }

    private double calculatePromoCodeDiscount(List<String> promoCodes, double subtotal) {
        double totalDiscount = 0.0;
        for (String code : promoCodes) {
            PromoCode promoCode = promoCodeRepository.findByCode(code).orElse(null);
            if (promoCode != null && promoCode.getActive()) {
                totalDiscount += (subtotal * promoCode.getDiscountPercentage()) / 100.0;
            }
        }
        return totalDiscount;
    }

    private Sort createSort(OrderSearchDTO.OrderSortBy sortBy, OrderSearchDTO.SortDirection sortDirection) {
        // Mapeo de Enum a nombre de campo real en la entidad Order
        String field = switch (sortBy) {
            case DATE -> "orderDate";
            case TOTAL -> "total";
            case STATUS -> "status";
            case null -> "orderDate";
        };

        Sort.Direction direction = (sortDirection == OrderSearchDTO.SortDirection.ASC)
                ? Sort.Direction.ASC : Sort.Direction.DESC;

        return Sort.by(direction, field);
    }

    private String emptyToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        if (currentStatus == newStatus) {
            throw new IllegalStateException(
                    "La orden ya está en estado " + currentStatus
            );
        }

        boolean isValid = switch (currentStatus) {
            case PENDING -> newStatus == OrderStatus.IN_PREPARATION
                    || newStatus == OrderStatus.CANCELLED;
            case IN_PREPARATION -> newStatus == OrderStatus.SHIPPED
                    || newStatus == OrderStatus.CANCELLED;
            case SHIPPED -> newStatus == OrderStatus.DELIVERED;
            case DELIVERED -> false;
            case CANCELLED -> false;
        };

        if (!isValid) {
            throw new IllegalStateException(
                    "Transición de estado no válida: "
                            + currentStatus + " → " + newStatus
            );
        }
    }

    private LocalDateTime calculateEstimatedDelivery(LocalDateTime orderDate) {
        return orderDate.plusDays(5);
    }

    // =========================================================
    // CONVERSORES
    // =========================================================

    private OrderDTO convertToOrderDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .subtotal(BigDecimal.valueOf(calculateSubtotal(order)))
                .totalDiscount(BigDecimal.valueOf(calculateTotalDiscount(order)))
                .total(BigDecimal.valueOf(order.getTotal()))
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .userId(order.getUser() != null ? order.getUser().getId() : null)
                .userFullName(order.getUser() != null ? order.getUser().getFullName() : null)
                .userEmail(order.getUser() != null ? order.getUser().getEmail() : null)
                .orderItems(order.getOrderItems().stream()
                        .map(this::convertToOrderItemResponseDTO) // Ahora sí coincide el tipo
                        .collect(Collectors.toList()))
                .totalItems(calculateTotalItems(order))
                .build();
    }

    private OrderItemResponseDTO convertToOrderItemResponseDTO(OrderItem orderItem) {
        if (orderItem == null) return null;

        return OrderItemResponseDTO.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProductName())
                .productImageUrl(orderItem.getProduct().getImageUrl())
                .quantity(orderItem.getQuantity())
                // En tu entidad el campo es finalPrice, no unitPrice
                .unitPrice(BigDecimal.valueOf(orderItem.getFinalPrice()))
                .originalSubtotal(BigDecimal.valueOf(orderItem.getSubtotal()))
                .discountAmount(BigDecimal.ZERO)
                .finalSubtotal(BigDecimal.valueOf(orderItem.getSubtotal()))
                .available(orderItem.getProduct().getStock() > 0)
                .hasExistingDiscount(false)
                .build();
    }

    private AppliedPromoCodeDTO convertToAppliedPromoCodeDTO(AppliedPromoCode appliedPromoCode) {
        if (appliedPromoCode == null) return null;

        return AppliedPromoCodeDTO.builder()
                .promoCode(appliedPromoCode.getPromoCode()) // Usa el getter que extrae el String del EmbeddedId
                .applicationDate(appliedPromoCode.getApplicationDate())
                .build();
    }

    private OrderSummaryDTO convertToOrderSummaryDTO(Order order) {
        String userFullName = order.getUser() != null
                ? order.getUser().getFullName()
                : "Invitado";

        List<OrderItem> items = order.getOrderItems();
        String firstProductName = items.isEmpty()
                ? "Sin productos"
                : items.get(0).getProductName();

        String summaryDescription;
        if (items.isEmpty()) {
            summaryDescription = "Sin productos";
        } else if (items.size() == 1) {
            summaryDescription = items.get(0).getProductName();
        } else {
            summaryDescription = items.get(0).getProductName()
                    + " +" + (items.size() - 1) + " más";
        }

        return OrderSummaryDTO.builder()
                .id(order.getId())
                .total(BigDecimal.valueOf(order.getTotal())) // Conversión de Double a BigDecimal
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .userFullName(userFullName)
                .totalItems(calculateTotalItems(order))
                .firstProductName(firstProductName)
                .summaryDescription(summaryDescription)
                .build();
    }

    private ShoppingCartDTO convertToShoppingCartDTO(ShoppingCart cart) {
        return ShoppingCartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser() != null ? cart.getUser().getId() : null)
                .guestCartId(cart.getUser() == null ? String.valueOf(cart.getId()) : null)
                .cartItems(cart.getCartItems().stream()
                        .map(this::convertToCartItemDTO)
                        .collect(Collectors.toList()))
                .total(cart.getTotal())
                .totalItems(cart.getCartItems().stream()
                        .mapToInt(CartItem::getQuantity)
                        .sum())
                .distinctItems(cart.getCartItems().size())
                .isExpired(cart.isExpired())
                .expiration(cart.getExpiration())
                .build();
    }

    private CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        return CartItemDTO.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .productImageUrl(cartItem.getProduct().getImageUrl())
                .quantity(cartItem.getQuantity())
                .unitPrice(cartItem.getUnitPrice())
                .subtotal(cartItem.getSubtotal())
                .available(cartItem.getProduct().getStock() > 0)
                .build();
    }

    private OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        return OrderItemDTO.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProductName())
                .quantity(orderItem.getQuantity())
                // Probablemente el campo en el DTO se llama unitPrice o price
                .unitPrice(BigDecimal.valueOf(orderItem.getFinalPrice()))
                .productImageUrl(orderItem.getProduct().getImageUrl())
                .build();
    }


    private ShippingAddressDTO convertToShippingAddressDTO(ShippingAddress shippingAddress) {
        if (shippingAddress == null) return null;
        return ShippingAddressDTO.builder()
                .id(shippingAddress.getId())
                .addressLine1(shippingAddress.getAddressLine1())
                .cityName(shippingAddress.getCity().getName())
                .postalCode(shippingAddress.getPostalCode() != null
                        ? shippingAddress.getPostalCode().getCode() : null)
                .build();
    }

    private double calculateSubtotal(Order order) {
        return order.getOrderItems().stream()
                .mapToDouble(OrderItem::getSubtotal)
                .sum();
    }

    private double calculateTotalDiscount(Order order) {
        double subtotal = calculateSubtotal(order);
        double totalDiscount = 0.0;
        for (AppliedPromoCode apc : order.getAppliedPromoCodes()) {
            // Cambiado de getPromoCodeEntity() a getPromoCodeRef()
            // para coincidir con tu entidad AppliedPromoCode
            totalDiscount += (subtotal * apc.getPromoCodeRef().getDiscountPercentage()) / 100.0;
        }
        return totalDiscount;
    }

    private int calculateTotalItems(Order order) {
        return order.getOrderItems().stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }
}