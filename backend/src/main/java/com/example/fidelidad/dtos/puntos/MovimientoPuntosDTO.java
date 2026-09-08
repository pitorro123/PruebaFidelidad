package com.example.fidelidad.dtos.puntos;

import java.time.LocalDate;

public record MovimientoPuntosDTO(
        Long id,
        String tipo,
        String marca,
        Integer puntos,
        String referencia,
        LocalDate fecha
) {
}