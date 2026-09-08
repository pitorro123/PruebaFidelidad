package com.example.fidelidad.servicios.campanas;

import com.example.fidelidad.dtos.campanas.CuponResponseDTO;

import java.util.List;

public interface IServicioCampanas {

    List<CuponResponseDTO> listarCupones(Long tipoIdentificacionId, String numeroIdentificacion);

    CuponResponseDTO usarCupon(String codigo);
}