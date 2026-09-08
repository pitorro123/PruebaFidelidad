package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Producto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductoRepositorio extends JpaRepository<Producto, Long> {

    @EntityGraph(attributePaths = {"marca"})
    List<Producto> findAllByOrderByNombreAsc();

    @Query("""
            select p from Producto p
            where lower(p.nombre) like lower(concat('%', :termino, '%'))
               or lower(p.categoria) like lower(concat('%', :termino, '%'))
               or lower(p.color) like lower(concat('%', :termino, '%'))
               or lower(p.marca.nombre) like lower(concat('%', :termino, '%'))
            order by p.nombre asc
            """)
    @EntityGraph(attributePaths = {"marca"})
    List<Producto> buscarPorTermino(@Param("termino") String termino);
}