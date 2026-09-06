package com.example.fidelidad.dtos.catalogo;

public record MarcaResponseDTO(Long id, String nombre) {

    public static MarcaResponseDTO from(Long id, String nombre) {
        return new MarcaResponseDTO(id, nombre);
    }
}