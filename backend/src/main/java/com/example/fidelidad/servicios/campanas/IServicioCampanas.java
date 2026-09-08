package com.example.fidelidad.servicios.campanas;

import com.example.fidelidad.dtos.campanas.CampanaRequestDTO;
import com.example.fidelidad.dtos.campanas.CampanaResponseDTO;
import com.example.fidelidad.dtos.campanas.CuponResponseDTO;

import java.util.List;

public interface IServicioCampanas {

    List<CampanaResponseDTO> listar();

    List<CampanaResponseDTO> listarActivas();

    CampanaResponseDTO crear(CampanaRequestDTO dto);

    List<CuponResponseDTO> generarBonosCumpleanos();

    List<CuponResponseDTO> listarCupones(Long tipoIdentificacionId, String numeroIdentificacion);

    CuponResponseDTO usarCupon(String codigo);
}