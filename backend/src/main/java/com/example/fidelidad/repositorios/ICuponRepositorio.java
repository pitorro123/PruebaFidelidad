package com.example.fidelidad.repositorios;

import com.example.fidelidad.modelos.Cupon;
import com.example.fidelidad.modelos.EstadoCupon;
import com.example.fidelidad.modelos.TipoCupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ICuponRepositorio extends JpaRepository<Cupon, Long> {

    List<Cupon> findAllByClienteIdOrderByFechaExpiracionDesc(Long clienteId);

    boolean existsByClienteIdAndTipoAndEstado(Long clienteId, TipoCupon tipo, EstadoCupon estado);

    Optional<Cupon> findByCodigoIgnoreCase(String codigo);
}