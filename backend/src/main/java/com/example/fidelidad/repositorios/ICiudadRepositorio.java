package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICiudadRepositorio extends JpaRepository<Ciudad, Long> {

    List<Ciudad> findByDepartamentoIdOrderByNombreAsc(Long departamentoId);
}