package com.example.fidelidad.dtos.catalogo;

public record CiudadResponseDTO(Long id, Long departamentoId, String nombre) {

    public static CiudadResponseDTO from(Long id, Long departamentoId, String nombre) {
        return new CiudadResponseDTO(id, departamentoId, nombre);
    }
}