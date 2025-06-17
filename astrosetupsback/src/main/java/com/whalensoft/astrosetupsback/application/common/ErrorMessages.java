package com.whalensoft.astrosetupsback.application.common;

public final class ErrorMessages {

    // Constructor privado para evitar instanciación
    private ErrorMessages() {}

    // ======================= USUARIOS =======================
    public static final String USER_NOT_FOUND = "Usuario no encontrado.";
    public static final String EMAIL_ALREADY_EXISTS = "El correo electrónico ya está registrado.";
    public static final String USER_NOT_VERIFIED = "El usuario aún no ha verificado su cuenta.";
    public static final String INVALID_LOGIN_CREDENTIALS = "Credenciales inválidas. Verifica tu correo y contraseña.";
    public static final String INCORRECT_CURRENT_PASSWORD = "La contraseña actual es incorrecta.";
    public static final String PASSWORDS_DO_NOT_MATCH = "Las contraseñas no coinciden.";

    // ======================= PRODUCTOS =======================
    public static final String PRODUCT_NOT_FOUND = "Producto no encontrado.";
    public static final String CATEGORY_NOT_FOUND = "Categoría no encontrada.";
    public static final String INVALID_PRODUCT_DATA = "Datos del producto no válidos.";
    public static final String PRODUCT_ALREADY_EXISTS = "Ya existe un producto con ese nombre o referencia.";

    // ======================= PEDIDOS =======================
    public static final String ORDER_NOT_FOUND = "Orden no encontrada.";
    public static final String ORDER_CANNOT_BE_MODIFIED = "La orden no puede ser modificada en su estado actual.";
    public static final String ORDER_ALREADY_CONFIRMED = "La orden ya ha sido confirmada y no puede editarse.";

    // ======================= CARRITO =======================
    public static final String CART_NOT_FOUND = "Carrito de compras no encontrado.";
    public static final String CART_EXPIRED = "El carrito ha expirado.";
    public static final String CART_ITEM_NOT_FOUND = "Elemento del carrito no encontrado.";

    // ======================= ENVÍOS =======================
    public static final String SHIPPING_ADDRESS_NOT_FOUND = "Dirección de envío no encontrada.";
    public static final String ADDRESS_DOES_NOT_BELONG_TO_USER = "La dirección no pertenece al usuario.";
    public static final String CITY_NOT_FOUND = "Ciudad no encontrada.";
    public static final String POSTAL_CODE_NOT_FOUND = "Código postal no encontrado.";

    // ======================= PROMOCIONES =======================
    public static final String PROMO_CODE_NOT_FOUND = "Código promocional no encontrado.";
    public static final String PROMO_CODE_INVALID = "El código promocional no es válido o ha expirado.";
    public static final String PROMO_ALREADY_APPLIED = "Ya se ha aplicado un código promocional a esta orden.";
    public static final String CANNOT_APPLY_PROMO_TO_DISCOUNTED_PRODUCT = "No se puede aplicar un código promocional a un producto con descuento.";

    // ======================= GARANTÍAS =======================
    public static final String WARRANTY_NOT_FOUND = "Solicitud de garantía no encontrada.";
    public static final String WARRANTY_ALREADY_REQUESTED = "Ya existe una solicitud de garantía para este producto.";

    // ======================= AUTENTICACIÓN =======================
    public static final String UNAUTHORIZED = "No autorizado.";
    public static final String FORBIDDEN = "Acceso denegado.";

}