package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IDepartamentoRepositorio extends JpaRepository<Departamento, Long> {

    List<Departamento> findByPaisIdOrderByNombreAsc(Long paisId);
}