package com.example.fidelidad.dtos.catalogo;

public record DepartamentoResponseDTO(Long id, Long paisId, String nombre) {

    public static DepartamentoResponseDTO from(Long id, Long paisId, String nombre) {
        return new DepartamentoResponseDTO(id, paisId, nombre);
    }
}