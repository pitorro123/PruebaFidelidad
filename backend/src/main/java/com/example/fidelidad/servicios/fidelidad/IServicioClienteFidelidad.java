package com.example.fidelidad.servicios.fidelidad;

import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadRequestDTO;
import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadResponseDTO;
import com.example.fidelidad.dtos.fidelidad.VerificacionRequestDTO;
import com.example.fidelidad.dtos.fidelidad.VerificacionResponseDTO;

import java.util.List;

public interface IServicioClienteFidelidad {

    ClienteFidelidadResponseDTO crear(ClienteFidelidadRequestDTO dto);

    VerificacionResponseDTO verificar(VerificacionRequestDTO dto);

    List<ClienteFidelidadResponseDTO> listar();

    ClienteFidelidadResponseDTO buscarPorId(Long id);
}