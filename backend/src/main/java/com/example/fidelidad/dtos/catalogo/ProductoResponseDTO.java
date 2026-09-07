package com.example.fidelidad.dtos.catalogo;

import com.example.fidelidad.modelos.Producto;

public record ProductoResponseDTO(
        Long id,
        String nombre,
        String categoria,
        String talla,
        String color,
        String marca,
        Integer precio,
        String estadoPrenda,
        String disponiblePara,
        String imagen
) {
    public static ProductoResponseDTO from(Producto producto) {
        return new ProductoResponseDTO(
                producto.getId(),
                producto.getNombre(),
                producto.getCategoria(),
                producto.getTalla(),
                producto.getColor(),
                producto.getMarca().getNombre(),
                producto.getPrecio(),
                producto.getEstadoPrenda(),
                producto.getDisponiblePara(),
                producto.getImagen());
    }
}