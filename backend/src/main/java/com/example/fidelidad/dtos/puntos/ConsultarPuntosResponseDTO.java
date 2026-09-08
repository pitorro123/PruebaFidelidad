package com.example.fidelidad.dtos.puntos;

import java.util.List;

public record ConsultarPuntosResponseDTO(
        Long clienteId,
        String tipoIdentificacionCodigo,
        String numeroIdentificacion,
        String nombres,
        String apellidos,
        Integer saldoPuntos,
        List<MovimientoPuntosDTO> movimientos
) {
}