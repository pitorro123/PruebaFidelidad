package com.example.fidelidad.dtos.catalogo;

public record TipoIdentificacionResponseDTO(Long id, String codigo, String nombre) {

    public static TipoIdentificacionResponseDTO from(Long id, String codigo, String nombre) {
        return new TipoIdentificacionResponseDTO(id, codigo, nombre);
    }
}