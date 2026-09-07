package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Producto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductoRepositorio extends JpaRepository<Producto, Long> {

    @EntityGraph(attributePaths = {"marca"})
    List<Producto> findAllByOrderByNombreAsc();
}