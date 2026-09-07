package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IMarcaRepositorio extends JpaRepository<Marca, Long> {

    List<Marca> findAllByOrderByNombreAsc();
}