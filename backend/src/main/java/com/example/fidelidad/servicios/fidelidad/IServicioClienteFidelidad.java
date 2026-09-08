package com.example.fidelidad.servicios.fidelidad;

import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadRequestDTO;
import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadResponseDTO;

public interface IServicioClienteFidelidad {

    ClienteFidelidadResponseDTO crear(ClienteFidelidadRequestDTO dto);
}