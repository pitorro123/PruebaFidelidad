package com.example.fidelidad.dtos.catalogo;

public record PaisResponseDTO(Long id, String nombre) {

    public static PaisResponseDTO from(Long id, String nombre) {
        return new PaisResponseDTO(id, nombre);
    }
}