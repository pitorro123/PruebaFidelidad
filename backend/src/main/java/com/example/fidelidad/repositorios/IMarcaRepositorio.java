package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IMarcaRepositorio extends JpaRepository<Marca, Long> {

    List<Marca> findAllByOrderByNombreAsc();

    Optional<Marca> findByNombreIgnoreCase(String nombre);
}