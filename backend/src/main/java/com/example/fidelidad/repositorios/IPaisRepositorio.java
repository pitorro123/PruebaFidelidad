package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Pais;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPaisRepositorio extends JpaRepository<Pais, Long> {

    List<Pais> findAllByOrderByNombreAsc();

    boolean existsByNombreIgnoreCase(String nombre);
}