package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Campana;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ICampanaRepositorio extends JpaRepository<Campana, Long> {

    List<Campana> findAllByOrderByFechaInicioDesc();

    List<Campana> findByFechaInicioLessThanEqualAndFechaFinGreaterThanEqualOrderByFechaInicioDesc(
            LocalDate hoyInicio, LocalDate hoyFin);

    List<Campana> findByFechaInicioGreaterThanOrderByFechaInicioAsc(LocalDate hoy);
}