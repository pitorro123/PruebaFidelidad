package com.example.fidelidad.servicios.campanas;

import com.example.fidelidad.dtos.campanas.CuponResponseDTO;
import com.example.fidelidad.modelos.ClienteFidelidad;
import com.example.fidelidad.modelos.Cupon;
import com.example.fidelidad.modelos.EstadoCupon;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.ICuponRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class ServicioCampanasImpl implements IServicioCampanas {

    private final ICuponRepositorio repositorioCupon;
    private final IClienteFidelidadRepositorio repositorioCliente;

    public ServicioCampanasImpl(
            ICuponRepositorio repositorioCupon,
            IClienteFidelidadRepositorio repositorioCliente) {
        this.repositorioCupon = repositorioCupon;
        this.repositorioCliente = repositorioCliente;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CuponResponseDTO> listarCupones(Long tipoIdentificacionId, String numeroIdentificacion) {
        ClienteFidelidad cliente = buscarPorDocumento(tipoIdentificacionId, numeroIdentificacion);
        return repositorioCupon.findAllByClienteIdOrderByFechaExpiracionDesc(cliente.getId()).stream()
                .map(this::toCuponResponse)
                .toList();
    }

    @Override
    @Transactional
    public CuponResponseDTO usarCupon(String codigo) {
        if (codigo == null || codigo.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Codigo de cupon requerido");
        }
        Cupon cupon = repositorioCupon.findByCodigoIgnoreCase(codigo.trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cupon no encontrado"));
        EstadoCupon estadoActual = estadoEfectivo(cupon);
        if (estadoActual == EstadoCupon.EXPIRADO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El cupon ya expiro");
        }
        if (estadoActual != EstadoCupon.ACTIVO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El cupon ya fue utilizado");
        }
        cupon.setEstado(EstadoCupon.USADO);
        return toCuponResponse(repositorioCupon.save(cupon));
    }

    private ClienteFidelidad buscarPorDocumento(Long tipoIdentificacionId, String numeroIdentificacion) {
        return repositorioCliente
                .findFirstByTipoIdentificacionIdAndNumeroIdentificacionOrderByFechaRegistroDesc(
                        tipoIdentificacionId, numeroIdentificacion.trim())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "El cliente no esta inscrito en el programa de fidelidad"));
    }

    private EstadoCupon estadoEfectivo(Cupon cupon) {
        if (cupon.getEstado() != EstadoCupon.ACTIVO) {
            return cupon.getEstado();
        }
        return cupon.getFechaExpiracion().isBefore(LocalDate.now()) ? EstadoCupon.EXPIRADO : EstadoCupon.ACTIVO;
    }

    private CuponResponseDTO toCuponResponse(Cupon c) {
        return new CuponResponseDTO(
                c.getId(),
                c.getCodigo(),
                c.getTipo().name(),
                c.getDescuentoPorcentaje(),
                c.getFechaExpiracion(),
                estadoEfectivo(c).name(),
                c.getCampana() == null ? null : c.getCampana().getNombre());
    }
}