package com.example.fidelidad.servicios.puntos;

import com.example.fidelidad.dtos.puntos.AcumularPuntosRequestDTO;
import com.example.fidelidad.dtos.puntos.CanjearPuntosRequestDTO;
import com.example.fidelidad.dtos.puntos.ConsultarPuntosResponseDTO;

public interface IServicioPuntos {

    ConsultarPuntosResponseDTO acumular(AcumularPuntosRequestDTO dto);

    ConsultarPuntosResponseDTO canjear(CanjearPuntosRequestDTO dto);

    ConsultarPuntosResponseDTO consultar(Long tipoIdentificacionId, String numeroIdentificacion);
}