package com.example.fidelidad.dtos.campanas;

import java.time.LocalDate;

public record CampanaRequestDTO(
        String nombre,
        String descripcion,
        LocalDate fechaInicio,
        LocalDate fechaFin,
        Integer descuentoPorcentaje
) {
}