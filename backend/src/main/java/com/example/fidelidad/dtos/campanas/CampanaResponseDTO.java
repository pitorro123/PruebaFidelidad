package com.example.fidelidad.dtos.campanas;

import java.time.LocalDate;

public record CampanaResponseDTO(
        Long id,
        String nombre,
        String descripcion,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        Integer descuentoPorcentaje,
        String estado
) {
}