package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICiudadRepositorio extends JpaRepository<Ciudad, Long> {

    List<Ciudad> findByDepartamentoIdOrderByNombreAsc(Long departamentoId);

    boolean existsByDepartamentoIdAndNombreIgnoreCase(Long departamentoId, String nombre);
}