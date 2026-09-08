package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.ClienteFidelidad;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IClienteFidelidadRepositorio extends JpaRepository<ClienteFidelidad, Long> {

    boolean existsByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaId(
            Long tipoIdentificacionId, String numeroIdentificacion, Long marcaId);

    Optional<ClienteFidelidad> findFirstByTipoIdentificacionIdAndNumeroIdentificacionOrderByFechaRegistroDesc(
            Long tipoIdentificacionId, String numeroIdentificacion);

    @Query("select c from ClienteFidelidad c where function('MONTH', c.fechaNacimiento) = :mes")
    List<ClienteFidelidad> findAllPorMesDeNacimiento(@Param("mes") int mes);

    @EntityGraph(attributePaths = {"tipoIdentificacion", "ciudad", "departamento", "pais", "marca"})
    List<ClienteFidelidad> findAllByOrderByFechaRegistroDesc();
}