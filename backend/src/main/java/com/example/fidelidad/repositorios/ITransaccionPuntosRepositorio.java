package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.TransaccionPuntos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITransaccionPuntosRepositorio extends JpaRepository<TransaccionPuntos, Long> {

    List<TransaccionPuntos> findAllByClienteIdOrderByFechaDescIdDesc(Long clienteId);
}