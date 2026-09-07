package com.example.fidelidad.servicios.producto;

import com.example.fidelidad.dtos.catalogo.ProductoResponseDTO;

import java.util.List;

public interface IServicioProducto {

    List<ProductoResponseDTO> listar();

    ProductoResponseDTO buscarPorId(Long id);
}