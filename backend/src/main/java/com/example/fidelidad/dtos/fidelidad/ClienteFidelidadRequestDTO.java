package com.example.fidelidad.dtos.fidelidad;

import java.time.LocalDate;

public record ClienteFidelidadRequestDTO(
        String email,
        Long tipoIdentificacionId,
        String numeroIdentificacion,
        String nombres,
        String apellidos,
        LocalDate fechaNacimiento,
        String direccion,
        Long ciudadId,
        Long departamentoId,
        Long paisId,
        Long marcaId
) {
}