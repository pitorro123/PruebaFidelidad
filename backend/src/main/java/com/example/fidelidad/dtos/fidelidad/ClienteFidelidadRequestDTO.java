package com.example.fidelidad.dtos.fidelidad;

import java.time.LocalDate;

/**
 * Cuerpo de la peticion para inscribir a un cliente en el programa de fidelidad.
 */
public record ClienteFidelidadRequestDTO(
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