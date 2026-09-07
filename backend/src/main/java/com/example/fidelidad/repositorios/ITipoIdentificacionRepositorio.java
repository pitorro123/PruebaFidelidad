package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.TipoIdentificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITipoIdentificacionRepositorio extends JpaRepository<TipoIdentificacion, Long> {

    List<TipoIdentificacion> findAllByOrderByNombreAsc();
}