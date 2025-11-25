package com.whalensoft.astrosetupsback.application.services;

import com.whalensoft.astrosetupsback.application.dto.common.PageResponseDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.AddToCartDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.CartSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.cart.UpdateCartItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.CheckoutSummaryDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ProcessCheckoutDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.checkout.ShippingAddressDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.orders.*;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderItemDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.OrderSearchResultDTO;
import com.whalensoft.astrosetupsback.application.dto.sales.search.SalesStatsDTO;
import com.whalensoft.astrosetupsback.application.interfaces.SalesService;
import com.whalensoft.astrosetupsback.domain.model.*;
import com.whalensoft.astrosetupsback.domain.repository.*;
import org.springframework.data.domain.Page;
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

    @Override
    public OrderDTO createOrder(CreateOrderDTO createOrderDTO) {
        // Validar datos de entrada
        validateCreateOrderData(createOrderDTO);
        
        User user = null;
        ShippingAddress shippingAddress = null;
        
        // Obtener usuario si se proporciona
        if (createOrderDTO.getUserId() != null) {
            user = userRepository.findById(createOrderDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }
        
        // Obtener dirección de envío
        if (createOrderDTO.getShippingAddressId() != null) {
            shippingAddress = shippingAddressRepository.findById(createOrderDTO.getShippingAddressId())
                    .orElseThrow(() -> new RuntimeException("Dirección de envío no encontrada"));
        } else if (createOrderDTO.getGuestShippingAddress() != null) {
            // Crear dirección temporal para usuario invitado
            shippingAddress = createGuestShippingAddress(createOrderDTO.getGuestShippingAddress());
        }
        
        // Crear items de la orden
        List<OrderItem> orderItems = createOrderDTO.getOrderItems().stream()
                .map(this::createOrderItem)
                .collect(Collectors.toList());
        
        // Calcular totales
        double subtotal = orderItems.stream()
                .mapToDouble(OrderItem::getSubtotal)
                .sum();
        
        // Aplicar códigos promocionales y calcular descuento total
        List<AppliedPromoCode> appliedPromoCodes = new ArrayList<>();
        double totalDiscount = 0.0;
        
        if (createOrderDTO.getPromoCodes() != null && !createOrderDTO.getPromoCodes().isEmpty()) {
            appliedPromoCodes = applyPromoCodesToOrder(createOrderDTO.getPromoCodes(), subtotal, user);
            // Calcular descuento total basado en los códigos promocionales aplicados
            totalDiscount = calculateTotalDiscountFromPromoCodes(appliedPromoCodes, subtotal);
        }
        
        double total = subtotal - totalDiscount;
        
        // Crear la orden
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
        
        // Asignar la orden a los items
        orderItems.forEach(item -> item.setOrder(order));
        appliedPromoCodes.forEach(apc -> apc.setOrder(order));
        
        // Guardar la orden
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
        // Crear Pageable
        Sort sort = createSort(searchDTO.getSortBy(), searchDTO.getSortDirection());
        Pageable pageable = PageRequest.of(searchDTO.getPage(), searchDTO.getSize(), sort);
        
        // Obtener órdenes paginadas
        Page<Order> ordersPage = orderRepository.findAll(pageable);
        
        // Filtrar por criterios adicionales si es necesario
        List<Order> filteredOrders = ordersPage.getContent().stream()
                .filter(order -> filterOrderByCriteria(order, searchDTO))
                .collect(Collectors.toList());
        
        // Convertir a DTOs
        List<OrderSearchResultDTO> results = filteredOrders.stream()
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
        
        // Validar transición de estado
        validateStatusTransition(order.getStatus(), updateStatusDTO.getStatus());
        
        // Actualizar estado
        order.setStatus(updateStatusDTO.getStatus());
        
        // Agregar observación si se proporciona
        if (updateStatusDTO.getObservation() != null && !updateStatusDTO.getObservation().trim().isEmpty()) {
            // Aquí podrías implementar un sistema de historial de estados
            // Por ahora solo actualizamos el estado
        }
        
        Order updatedOrder = orderRepository.save(order);
        
        return convertToOrderDTO(updatedOrder);
    }

    @Override
    public List<OrderStatusHistoryDTO> getOrderStatusHistory(Long id) {
        // Validar que la orden existe
        orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        
        // Por ahora retornamos una lista vacía ya que no tenemos implementado
        // el historial de estados. Esto se puede implementar con una entidad separada
        return new ArrayList<>();
    }

    @Override
    public OrderTrackingDTO getOrderTracking(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        
        return OrderTrackingDTO.builder()
                .id(order.getId())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .estimatedDelivery(calculateEstimatedDelivery(order.getOrderDate()))
                .statusHistory(new ArrayList<>()) // Implementar historial real
                .shippingAddress(convertToShippingAddressDTO(order.getShippingAddress()))
                .build();
    }

    @Override
    public List<OrderSummaryDTO> getCustomerOrders(Long customerId) {
        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        
        List<Order> orders = orderRepository.findByUser(user);
        
        return orders.stream()
                .map(this::convertToOrderSummaryDTO)
                .collect(Collectors.toList());
    }

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
        // Validar que el producto existe
        Product product = productRepository.findById(addToCartDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Validar que el producto está activo
        if (!product.getActive()) {
            throw new RuntimeException("El producto no está disponible");
        }

        // Obtener o crear carrito para el usuario
        User user = userRepository.findById(addToCartDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseGet(() -> createNewShoppingCart(user));

        // Verificar si el producto ya está en el carrito
        Optional<CartItem> existingItem = cartItemRepository.findByShoppingCartAndProduct(cart, product);

        CartItem cartItem;
        if (existingItem.isPresent()) {
            // Actualizar cantidad
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + addToCartDTO.getQuantity());
        } else {
            // Crear nuevo item
            cartItem = CartItem.builder()
                    .shoppingCart(cart)
                    .product(product)
                    .productName(product.getName()) // ← ¡ESTO es lo que te faltaba!
                    .quantity(addToCartDTO.getQuantity())
                    .unitPrice(product.getEffectivePrice()) // ← Mejor usar el precio efectivo
                    .build();
        }

        CartItem savedItem = cartItemRepository.save(cartItem);

        return convertToCartItemDTO(savedItem);
    }


    @Override
    public CartItemDTO updateCartItem(Long cartItemId, UpdateCartItemDTO updateCartItemDTO) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Item del carrito no encontrado"));
        
        // Validar cantidad
        if (updateCartItemDTO.getQuantity() <= 0) {
            cartItemRepository.deleteById(cartItemId);
            return null; // Item eliminado
        }
        
        cartItem.setQuantity(updateCartItemDTO.getQuantity());
        CartItem updatedItem = cartItemRepository.save(cartItem);
        
        return convertToCartItemDTO(updatedItem);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            throw new RuntimeException("Item del carrito no encontrado");
        }
        
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public CartSummaryDTO getCartSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElse(null);
        
        if (cart == null || cart.getCartItems().isEmpty()) {
            return CartSummaryDTO.builder()
                    .id(null)
                    .total(0.0)
                    .totalItems(0)
                    .isExpired(false)
                    .expiration(null)
                    .build();
        }
        
        int totalItems = cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
        
        return CartSummaryDTO.builder()
                .id(cart.getId())
                .total(cart.getTotal())
                .totalItems(totalItems)
                .isExpired(cart.isExpired())
                .expiration(cart.getExpiration())
                .build();
    }

    @Override
    public CheckoutSummaryDTO processCheckout(ProcessCheckoutDTO checkoutDTO) {
        // Validar datos de checkout
        validateCheckoutData(checkoutDTO);
        
        // Obtener carrito
        User user = userRepository.findById(checkoutDTO.getOrderData().getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        ShoppingCart cart = shoppingCartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        
        // Validar que el carrito no esté expirado
        /*if (cart.isExpired()) {
            throw new RuntimeException("El carrito ha expirado");
        }*/
        
        // Calcular totales
        double subtotal = cart.getTotal();
        double totalDiscount = 0.0;
        
        // Aplicar códigos promocionales si se proporcionan
        if (checkoutDTO.getOrderData().getPromoCodes() != null && !checkoutDTO.getOrderData().getPromoCodes().isEmpty()) {
            totalDiscount = calculatePromoCodeDiscount(checkoutDTO.getOrderData().getPromoCodes(), subtotal);
        }
        
        double total = subtotal - totalDiscount;
        
        // Crear resumen de checkout
        return CheckoutSummaryDTO.builder()
                .subtotal(subtotal)
                .totalDiscount(totalDiscount)
                .total(total)
                .totalItems(cart.getCartItems().stream()
                        .mapToInt(CartItem::getQuantity)
                        .sum())
                .build();
    }

    @Override
    public PromoCodeValidationDTO validatePromoCode(String code) {
        PromoCode promoCode = promoCodeRepository.findByCode(code)
                .orElse(null);
        
        if (promoCode == null) {
            return PromoCodeValidationDTO.builder()
                    .promoCode(code)
                    .isValid(false)
                    .validationMessage("Código promocional no encontrado")
                    .discountPercentage(0.0)
                    .estimatedDiscount(0.0)
                    .build();
        }
        
        // Validar que esté activo
        if (!promoCode.getActive()) {
            return PromoCodeValidationDTO.builder()
                    .promoCode(code)
                    .isValid(false)
                    .validationMessage("Código promocional inactivo")
                    .discountPercentage(0.0)
                    .estimatedDiscount(0.0)
                    .build();
        }
        
        // Validar fecha de expiración
        if (promoCode.getExpirationDate() != null && 
            LocalDateTime.now().isAfter(promoCode.getExpirationDate())) {
            return PromoCodeValidationDTO.builder()
                    .promoCode(code)
                    .isValid(false)
                    .validationMessage("Código promocional expirado")
                    .discountPercentage(0.0)
                    .estimatedDiscount(0.0)
                    .build();
        }
        
        return PromoCodeValidationDTO.builder()
                .promoCode(code)
                .isValid(true)
                .validationMessage("Código promocional válido")
                .discountPercentage(promoCode.getDiscountPercentage())
                .estimatedDiscount(0.0) // Se calculará cuando se aplique
                .build();
    }

    @Override
    public AppliedPromoCodeDTO applyPromoCode(ApplyPromoCodeDTO applyPromoCodeDTO) {
        // Validar código promocional
        PromoCodeValidationDTO validation = validatePromoCode(applyPromoCodeDTO.getPromoCode());
        
        if (!validation.getIsValid()) {
            throw new RuntimeException(validation.getValidationMessage());
        }
        
        PromoCode promoCode = promoCodeRepository.findByCode(applyPromoCodeDTO.getPromoCode())
                .orElseThrow(() -> new RuntimeException("Código promocional no encontrado"));
        
        // Obtener el subtotal del carrito para calcular el descuento
        double subtotal = 0.0;
        if (applyPromoCodeDTO.getCartId() != null) {
            ShoppingCart cart = shoppingCartRepository.findById(applyPromoCodeDTO.getCartId())
                    .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
            subtotal = cart.getTotal();
        } else if (applyPromoCodeDTO.getUserId() != null) {
            User user = userRepository.findById(applyPromoCodeDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            ShoppingCart cart = shoppingCartRepository.findByUser(user)
                    .orElse(null);
            if (cart != null) {
                subtotal = cart.getTotal();
            }
        }
        
        // Calcular descuento
        double discountAmount = (subtotal * promoCode.getDiscountPercentage()) / 100.0;
        
        return AppliedPromoCodeDTO.builder()
                .promoCode(promoCode.getCode())
                .discountPercentage(promoCode.getDiscountPercentage())
                .discountAmount(discountAmount)
                .applicationDate(LocalDateTime.now())
                .build();
    }

    @Override
    public SalesStatsDTO getSalesStats() {
        // Obtener estadísticas de órdenes por estado
        Long pendingOrders = orderRepository.countByStatus(OrderStatus.PENDING);
        Long shippedOrders = orderRepository.countByStatus(OrderStatus.SHIPPED);
        Long deliveredOrders = orderRepository.countByStatus(OrderStatus.DELIVERED);
        Long cancelledOrders = orderRepository.countByStatus(OrderStatus.CANCELLED);
        
        // Obtener todas las órdenes para calcular totales
        List<Order> allOrders = orderRepository.findAll(Pageable.unpaged()).getContent();
        
        Long totalOrders = (long) allOrders.size();
        Double totalRevenue = allOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                .mapToDouble(Order::getTotal)
                .sum();
        
        Double averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0.0;
        
        // Contar clientes únicos
        Long totalCustomers = allOrders.stream()
                .map(order -> order.getUser())
                .filter(Objects::nonNull)
                .distinct()
                .count();
        
        return SalesStatsDTO.builder()
                .totalOrders(totalOrders)
                .pendingOrders(pendingOrders)
                .shippedOrders(shippedOrders)
                .deliveredOrders(deliveredOrders)
                .cancelledOrders(cancelledOrders)
                .totalRevenue(totalRevenue)
                .averageOrderValue(averageOrderValue)
                .totalCustomers(totalCustomers)
                .build();
    }

    // Métodos auxiliares privados

    private void validateCreateOrderData(CreateOrderDTO createOrderDTO) {
        if (createOrderDTO.getOrderItems() == null || createOrderDTO.getOrderItems().isEmpty()) {
            throw new RuntimeException("La orden debe tener al menos un item");
        }
        
        if (createOrderDTO.getPaymentMethod() == null) {
            throw new RuntimeException("El método de pago es obligatorio");
        }
        
        if (createOrderDTO.getShippingAddressId() == null && createOrderDTO.getGuestShippingAddress() == null) {
            throw new RuntimeException("Se requiere una dirección de envío");
        }
    }

    private OrderItem createOrderItem(CreateOrderItemDTO createOrderItemDTO) {
        Product product = productRepository.findById(createOrderItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        int quantity = createOrderItemDTO.getQuantity();
        double finalPrice = createOrderItemDTO.getFinalPrice();
        double subtotal = finalPrice * quantity;

        return OrderItem.builder()
                .product(product)
                .productName(product.getName())
                .quantity(quantity)
                .finalPrice(finalPrice)
                .subtotal(subtotal)
                .build();
    }

    private ShippingAddress createGuestShippingAddress(CreateShippingAddressDTO guestAddressDTO) {
        // Implementar creación de dirección temporal
        // Por ahora retornamos null, se debe implementar según la estructura de ShippingAddress
        return null;
    }

    private List<AppliedPromoCode> applyPromoCodesToOrder(List<String> promoCodes, double subtotal, User user) {
        List<AppliedPromoCode> appliedCodes = new ArrayList<>();
        
        for (String code : promoCodes) {
            PromoCode promoCode = promoCodeRepository.findByCode(code)
                    .orElse(null);
            
            if (promoCode != null && promoCode.getActive()) {
                // Crear AppliedPromoCode sin el campo discountAmount que no existe en la entidad
                AppliedPromoCode appliedCode = AppliedPromoCode.builder()
                        .promoCode(code)
                        .userId(user != null ? user.getId() : null)
                        .orderId(null) // Se asignará después de crear la orden
                        .promoCodeEntity(promoCode)
                        .user(user)
                        .order(null) // Se asignará después de crear la orden
                        .applicationDate(LocalDateTime.now())
                        .build();
                
                appliedCodes.add(appliedCode);
            }
        }
        
        return appliedCodes;
    }

    private double calculateTotalDiscountFromPromoCodes(List<AppliedPromoCode> appliedPromoCodes, double subtotal) {
        double totalDiscount = 0.0;
        
        for (AppliedPromoCode appliedPromoCode : appliedPromoCodes) {
            // Calcular el descuento basado en el porcentaje del código promocional
            double discountAmount = (subtotal * appliedPromoCode.getPromoCodeEntity().getDiscountPercentage()) / 100.0;
            totalDiscount += discountAmount;
        }
        
        return totalDiscount;
    }

    private Sort createSort(String sortBy, String sortDirection) {
        if (sortBy == null) {
            sortBy = "orderDate";
        }
        
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDirection) ? 
                Sort.Direction.DESC : Sort.Direction.ASC;
        
        return Sort.by(direction, sortBy);
    }

    private boolean filterOrderByCriteria(Order order, OrderSearchDTO searchDTO) {
        // Implementar filtros adicionales si es necesario
        // Por ahora retornamos true (sin filtros adicionales)
        return true;
    }

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        // Implementar validaciones de transición de estado
        // Por ejemplo: PENDING -> SHIPPED -> DELIVERED
        // O PENDING -> CANCELLED
    }

    private LocalDateTime calculateEstimatedDelivery(LocalDateTime orderDate) {
        // Calcular fecha estimada de entrega (ejemplo: 5 días hábiles)
        return orderDate.plusDays(5);
    }

    private String generateTrackingNumber(Long orderId) {
        // Generar número de seguimiento único
        return "TRK-" + orderId + "-" + System.currentTimeMillis();
    }

    private ShoppingCart createNewShoppingCart(User user) {
        ShoppingCart cart = ShoppingCart.builder()
                .user(user)
                .expiration(LocalDateTime.now().plusHours(24))
                .build();
        
        return shoppingCartRepository.save(cart);
    }

    private void validateCheckoutData(ProcessCheckoutDTO checkoutDTO) {
        if (checkoutDTO.getOrderData().getUserId() == null) {
            throw new RuntimeException("ID de usuario es obligatorio");
        }
        
        if (checkoutDTO.getOrderData().getPaymentMethod() == null) {
            throw new RuntimeException("Método de pago es obligatorio");
        }
    }

    private double calculatePromoCodeDiscount(List<String> promoCodes, double subtotal) {
        double totalDiscount = 0.0;
        
        for (String code : promoCodes) {
            PromoCode promoCode = promoCodeRepository.findByCode(code)
                    .orElse(null);
            
            if (promoCode != null && promoCode.getActive()) {
                totalDiscount += (subtotal * promoCode.getDiscountPercentage()) / 100.0;
            }
        }
        
        return totalDiscount;
    }

    // Métodos de conversión

    private OrderDTO convertToOrderDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .total(order.getTotal())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .userId(order.getUser() != null ? order.getUser().getId() : null)
                .userFullName(order.getUser() != null ? order.getUser().getFullName() : null)
                .userEmail(order.getUser() != null ? order.getUser().getEmail() : null)
                .shippingAddress(convertToShippingAddressDTO(order.getShippingAddress()))
                .orderItems(order.getOrderItems().stream()
                        .map(this::convertToOrderItemDTO)
                        .collect(Collectors.toList()))
                .appliedPromoCodes(order.getAppliedPromoCodes().stream()
                        .map(this::convertToAppliedPromoCodeDTO)
                        .collect(Collectors.toList()))
                .subtotal(calculateSubtotal(order))
                .totalDiscount(calculateTotalDiscount(order))
                .totalItems(calculateTotalItems(order))
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
                .total(order.getTotal())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .totalItems(calculateTotalItems(order))
                .build();
    }

    private ShoppingCartDTO convertToShoppingCartDTO(ShoppingCart cart) {
        return ShoppingCartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .expiration(cart.getExpiration())
                .cartItems(cart.getCartItems().stream()
                        .map(this::convertToCartItemDTO)
                        .collect(Collectors.toList()))
                .total(cart.getTotal())
                .totalItems(cart.getCartItems().stream()
                        .mapToInt(CartItem::getQuantity)
                        .sum())
                .isExpired(cart.isExpired())
                .build();
    }

    private CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        return CartItemDTO.builder()
                .id(cartItem.getId())
                .productId(cartItem.getProduct().getId())
                .productName(cartItem.getProduct().getName())
                .quantity(cartItem.getQuantity())
                .unitPrice(cartItem.getUnitPrice())
                .subtotal(cartItem.getSubtotal())
                .build();
    }

    private OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        return OrderItemDTO.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct().getId())
                .productName(orderItem.getProductName())
                .quantity(orderItem.getQuantity())
                .finalPrice(orderItem.getFinalPrice())
                .subtotal(orderItem.getSubtotal())
                .productImageUrl(orderItem.getProduct().getImageUrl())
                .build();
    }

    private AppliedPromoCodeDTO convertToAppliedPromoCodeDTO(AppliedPromoCode appliedPromoCode) {
        // Calcular el descuento basado en el subtotal de la orden
        double discountAmount = 0.0;
        if (appliedPromoCode.getOrder() != null) {
            double subtotal = calculateSubtotal(appliedPromoCode.getOrder());
            discountAmount = (subtotal * appliedPromoCode.getPromoCodeEntity().getDiscountPercentage()) / 100.0;
        }
        
        return AppliedPromoCodeDTO.builder()
                .promoCode(appliedPromoCode.getPromoCode())
                .discountPercentage(appliedPromoCode.getPromoCodeEntity().getDiscountPercentage())
                .discountAmount(discountAmount)
                .applicationDate(appliedPromoCode.getApplicationDate())
                .build();
    }

    private ShippingAddressDTO convertToShippingAddressDTO(ShippingAddress shippingAddress) {
        if (shippingAddress == null) {
            return null;
        }
        
        return ShippingAddressDTO.builder()
                .id(shippingAddress.getId())
                .address(shippingAddress.getAddress())
                .cityName(shippingAddress.getCity().getName())
                .postalCode(shippingAddress.getPostalCode() != null ? shippingAddress.getPostalCode().getCode() : null)
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
        
        for (AppliedPromoCode appliedPromoCode : order.getAppliedPromoCodes()) {
            // Calcular el descuento basado en el porcentaje del código promocional
            double discountAmount = (subtotal * appliedPromoCode.getPromoCodeEntity().getDiscountPercentage()) / 100.0;
            totalDiscount += discountAmount;
        }
        
        return totalDiscount;
    }

    private int calculateTotalItems(Order order) {
        return order.getOrderItems().stream()
                .mapToInt(OrderItem::getQuantity)
                .sum();
    }
}