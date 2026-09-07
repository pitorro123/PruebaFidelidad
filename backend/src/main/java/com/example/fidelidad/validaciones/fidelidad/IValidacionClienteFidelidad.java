package com.example.fidelidad.validaciones.fidelidad;

public interface IValidacionClienteFidelidad {

    void validar(String email,
                 Long tipoIdentificacionId,
                 String numeroIdentificacion,
                 java.time.LocalDate fechaNacimiento,
                 Long paisId,
                 Long departamentoId,
                 Long ciudadId,
                 Long marcaId);
}