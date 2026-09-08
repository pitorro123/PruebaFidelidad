package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.ClienteFidelidad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IClienteFidelidadRepositorio extends JpaRepository<ClienteFidelidad, Long> {

    boolean existsByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaId(
            Long tipoIdentificacionId, String numeroIdentificacion, Long marcaId);

    Optional<ClienteFidelidad> findFirstByTipoIdentificacionIdAndNumeroIdentificacionOrderByFechaRegistroDesc(
            Long tipoIdentificacionId, String numeroIdentificacion);
}