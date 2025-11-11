package com.whalensoft.astrosetupsback.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"shoppingCart", "product"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    @EqualsAndHashCode.Include
    private Long id;

    /**
     * Relación muchos-a-uno con el carrito.
     * Cada item pertenece a un único ShoppingCart.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shopping_cart_id", nullable = false)
    private ShoppingCart shoppingCart;

    /**
     * Relación muchos-a-uno con el producto.
     * Se carga perezosamente para optimizar rendimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /**
     * Cantidad del producto en el carrito.
     * Debe ser al menos 1.
     */
    @Column(nullable = false)
    @Min(value = 1, message = "La cantidad mínima es 1")
    private Integer quantity;

    /**
     * Precio unitario en el momento de agregar al carrito.
     * No puede ser cero ni negativo.
     */
    @Column(name = "unit_price", nullable = false)
    @DecimalMin(value = "0.01", message = "El precio unitario debe ser mayor a 0")
    private Double unitPrice;

    /**
     * Calcula el subtotal dinámicamente (sin persistir).
     * Si los valores son nulos, devuelve 0.0 para evitar errores.
     */
    @Transient
    public Double getSubtotal() {
        if (quantity == null || unitPrice == null) return 0.0;
        return quantity * unitPrice;
    }
}