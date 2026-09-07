package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Pais;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPaisRepositorio extends JpaRepository<Pais, Long> {

    List<Pais> findAllByOrderByNombreAsc();
}