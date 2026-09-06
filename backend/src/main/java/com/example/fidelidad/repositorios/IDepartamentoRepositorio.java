package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDepartamentoRepositorio extends JpaRepository<Departamento, Long> {

    List<Departamento> findByPaisIdOrderByNombreAsc(Long paisId);

    boolean existsByPaisIdAndNombreIgnoreCase(Long paisId, String nombre);
}