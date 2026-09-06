package com.example.fidelidad.dtos.fidelidad;

import java.time.LocalDate;

public record ClienteFidelidadResponseDTO(
        Long id,
        String tipoIdentificacionCodigo,
        String tipoIdentificacionNombre,
        String numeroIdentificacion,
        String nombres,
        String apellidos,
        LocalDate fechaNacimiento,
        String direccion,
        String ciudad,
        String departamento,
        String pais,
        String marca,
        LocalDate fechaRegistro
) {
}