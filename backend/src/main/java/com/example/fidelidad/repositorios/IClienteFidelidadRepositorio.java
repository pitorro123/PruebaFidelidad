package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.ClienteFidelidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IClienteFidelidadRepositorio extends JpaRepository<ClienteFidelidad, Long> {

    boolean existsByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaId(
            Long tipoIdentificacionId, String numeroIdentificacion, Long marcaId);

    Optional<ClienteFidelidad> findTopByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaIdOrderByFechaRegistroDesc(
            Long tipoIdentificacionId, String numeroIdentificacion, Long marcaId);

    List<ClienteFidelidad> findAllByOrderByFechaRegistroDesc();
}