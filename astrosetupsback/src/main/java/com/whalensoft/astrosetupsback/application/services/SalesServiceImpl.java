package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.AddToCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.ShoppingCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.UpdateCartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.CheckoutSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ProcessCheckoutDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.*;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.SalesStatsDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.ApplyPromoCodeDTO;
import com.whalensoft.astrosetupsback.application.dto.promotion.validation.PromoCodeValidationDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.shipping.address.CreateShippingAddressDTO;
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
import java.time.LocalDateTime;
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

    public SalesServiceImpl(
            OrderRepository orderRepository,
            ShoppingCartRepository shoppingCartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            PromoCodeRepository promoCodeRepository,
            ShippingAddressRepository shippingAddressRepository) {
        this.orderRepository = orderRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.promoCodeRepository = promoCodeRepository;
        this.shippingAddressRepository = shippingAddressRepository;
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

        List<AppliedPromoCode> appliedPromoCodes = new ArrayList<>();
        double totalDiscount = 0.0;

        if (createOrderDTO.getPromoCodes() != null && !createOrderDTO.getPromoCodes().isEmpty()) {
            appliedPromoCodes = applyPromoCodesToOrder(createOrderDTO.getPromoCodes(), subtotal, user);
            totalDiscount = calculateTotalDiscountFromPromoCodes(appliedPromoCodes, subtotal);
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
                .appliedPromoCodes(appliedPromoCodes)
                .build();

        orderItems.forEach(item -> item.setOrder(order));
        appliedPromoCodes.forEach(apc -> apc.setOrder(order));

        Order savedOrder = orderRepository.save(order);
        return convertToOrderDTO(savedOrder);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        return convertToOrderDTO(order);
    }

    @Override
    public PageResponseDTO<OrderSearchResultDTO> searchOrders(OrderSearchDTO searchDTO) {
        // Se pasan los Enums directamente al nuevo createSort corregido
        Sort sort = createSort(searchDTO.getSortBy(), searchDTO.getSortDirection());
        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), sort);

        Page<Order> ordersPage = orderRepository.findAll(pageable);

        List<OrderSearchResultDTO> results = ordersPage.getContent().stream()
                .filter(order -> filterOrderByCriteria(order, searchDTO))
                .map(this::convertToOrderSearchResultDTO)
                .collect(Collectors.toList());

        return PageResponseDTO.<OrderSearchResultDTO>builder()
                .content(results)
                .totalElements(ordersPage.getTotalElements())
                .totalPages(ordersPage.getTotalPages())
                .currentPage(ordersPage.getNumber())
                .size(ordersPage.getSize())
                .build();
    }

    @Override
    public OrderDTO updateOrderStatus(Long id, UpdateOrderStatusDTO updateStatusDTO) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        validateStatusTransition(order.getStatus(), updateStatusDTO.getStatus());
        order.setStatus(updateStatusDTO.getStatus());

        Order updatedOrder = orderRepository.save(order);
        return convertToOrderDTO(updatedOrder);
    }

    @Override
    public List<OrderStatusHistoryDTO> getOrderStatusHistory(Long id) {
        orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        return new ArrayList<>();
    }

    @Override
    public OrderTrackingDTO getOrderTracking(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        return OrderTrackingDTO.builder()
                .orderId(order.getId())
                .currentStatus(order.getStatus())
                .orderDate(order.getOrderDate())
                .estimatedDelivery(calculateEstimatedDelivery(order.getOrderDate()))
                .statusHistory(new ArrayList<>())
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

        Sort.Direction direction = (sortDirection == OrderSearchDTO.SortDirection.DESC)
                ? Sort.Direction.DESC : Sort.Direction.ASC;

        return Sort.by(direction, field);
    }

    private boolean filterOrderByCriteria(Order order, OrderSearchDTO searchDTO) {
        return true;
    }

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        // Pendiente de implementar validaciones de transición
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

    private OrderSearchResultDTO convertToOrderSearchResultDTO(Order order) {
        return OrderSearchResultDTO.builder()
                .orders(List.of(convertToOrderSummaryDTO(order)))
                .totalElements(1L)
                .totalPages(1)
                .currentPage(0)
                .pageSize(1)
                .hasNext(false)
                .hasPrevious(false)
                .build();
    }

    private OrderSummaryDTO convertToOrderSummaryDTO(Order order) {
        return OrderSummaryDTO.builder()
                .id(order.getId())
                .total(BigDecimal.valueOf(order.getTotal())) // Conversión de Double a BigDecimal
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .totalItems(calculateTotalItems(order))
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