package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Campana;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICampanaRepositorio extends JpaRepository<Campana, Long> {
}