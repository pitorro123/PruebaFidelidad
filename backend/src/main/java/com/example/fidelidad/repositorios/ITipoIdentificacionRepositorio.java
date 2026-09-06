package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.TipoIdentificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITipoIdentificacionRepositorio extends JpaRepository<TipoIdentificacion, Long> {

    List<TipoIdentificacion> findAllByOrderByNombreAsc();

    Optional<TipoIdentificacion> findByCodigoIgnoreCase(String codigo);
}