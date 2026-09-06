package com.example.fidelidad.servicios.catalogo;

import com.example.fidelidad.dtos.catalogo.CiudadResponseDTO;
import com.example.fidelidad.dtos.catalogo.DepartamentoResponseDTO;
import com.example.fidelidad.dtos.catalogo.MarcaResponseDTO;
import com.example.fidelidad.dtos.catalogo.PaisResponseDTO;
import com.example.fidelidad.dtos.catalogo.TipoIdentificacionResponseDTO;

import java.util.List;

public interface IServicioCatalogo {

    List<PaisResponseDTO> listarPaises();

    List<DepartamentoResponseDTO> listarDepartamentos(Long paisId);

    List<CiudadResponseDTO> listarCiudades(Long departamentoId);

    List<TipoIdentificacionResponseDTO> listarTiposIdentificacion();

    List<MarcaResponseDTO> listarMarcas();
}