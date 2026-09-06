package com.example.fidelidad.validaciones.fidelidad;

/**
 * Validador de negocio del registro de fidelidad: duplicados, edad minima,
 * formato de identificacion segun tipo, consistencia pais-departamento-ciudad.
 */
public interface IValidacionClienteFidelidad {

    void validar(Long tipoIdentificacionId,
                 String numeroIdentificacion,
                 java.time.LocalDate fechaNacimiento,
                 Long paisId,
                 Long departamentoId,
                 Long ciudadId,
                 Long marcaId);
}