package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.ClienteFidelidad;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IClienteFidelidadRepositorio extends JpaRepository<ClienteFidelidad, Long> {

    boolean existsByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaId(
            Long tipoIdentificacionId, String numeroIdentificacion, Long marcaId);

    @EntityGraph(attributePaths = {"tipoIdentificacion", "ciudad", "departamento", "pais", "marca"})
    List<ClienteFidelidad> findAllByOrderByFechaRegistroDesc();
}