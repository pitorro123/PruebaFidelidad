package com.example.fidelidad.servicios.puntos;

import com.example.fidelidad.dtos.puntos.AcumularPuntosRequestDTO;
import com.example.fidelidad.dtos.puntos.CanjearPuntosRequestDTO;
import com.example.fidelidad.dtos.puntos.ConsultarPuntosResponseDTO;
import com.example.fidelidad.dtos.puntos.MovimientoPuntosDTO;
import com.example.fidelidad.modelos.ClienteFidelidad;
import com.example.fidelidad.modelos.Marca;
import com.example.fidelidad.modelos.TipoMovimientoPuntos;
import com.example.fidelidad.modelos.TransaccionPuntos;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.ITransaccionPuntosRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class ServicioPuntosImpl implements IServicioPuntos {

    public static final int MINIMO_CANJE_SUMAS = 10_000;

    private final IClienteFidelidadRepositorio repositorioCliente;
    private final IMarcaRepositorio repositorioMarca;
    private final ITransaccionPuntosRepositorio repositorioTransacciones;

    public ServicioPuntosImpl(
            IClienteFidelidadRepositorio repositorioCliente,
            IMarcaRepositorio repositorioMarca,
            ITransaccionPuntosRepositorio repositorioTransacciones) {
        this.repositorioCliente = repositorioCliente;
        this.repositorioMarca = repositorioMarca;
        this.repositorioTransacciones = repositorioTransacciones;
    }

    @Override
    @Transactional
    public ConsultarPuntosResponseDTO acumular(AcumularPuntosRequestDTO dto) {
        if (dto.tipoIdentificacionId() == null || dto.numeroIdentificacion() == null
                || dto.numeroIdentificacion().isBlank()
                || dto.marcaId() == null || dto.valorCompra() == null || dto.valorCompra() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos de acumulacion invalidos");
        }
        ClienteFidelidad cliente = buscarPorDocumento(dto.tipoIdentificacionId(), dto.numeroIdentificacion());
        Marca marca = repositorioMarca.findById(dto.marcaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca invalida"));
        cliente.setSaldoPuntos(cliente.getSaldoPuntos() + dto.valorCompra());
        repositorioCliente.save(cliente);
        registrarMovimiento(cliente, marca, TipoMovimientoPuntos.ACUMULACION, dto.valorCompra(), dto.referencia());
        return consultar(dto.tipoIdentificacionId(), dto.numeroIdentificacion());
    }

    @Override
    @Transactional
    public ConsultarPuntosResponseDTO canjear(CanjearPuntosRequestDTO dto) {
        if (dto.tipoIdentificacionId() == null || dto.numeroIdentificacion() == null
                || dto.numeroIdentificacion().isBlank()
                || dto.puntos() == null || dto.puntos() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos de canje invalidos");
        }
        ClienteFidelidad cliente = buscarPorDocumento(dto.tipoIdentificacionId(), dto.numeroIdentificacion());
        if (cliente.getSaldoPuntos() < MINIMO_CANJE_SUMAS) {
            throw new ResponseStatusException(HttpStatus.valueOf(422),
                    "Debe acumular al menos " + MINIMO_CANJE_SUMAS + " puntos para poder canjear");
        }
        if (dto.puntos() > cliente.getSaldoPuntos()) {
            throw new ResponseStatusException(HttpStatus.valueOf(422), "Saldo de puntos insuficiente");
        }
        Marca marca = dto.marcaId() == null ? null : repositorioMarca.findById(dto.marcaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca invalida"));
        cliente.setSaldoPuntos(cliente.getSaldoPuntos() - dto.puntos());
        repositorioCliente.save(cliente);
        registrarMovimiento(cliente, marca, TipoMovimientoPuntos.CANJE, dto.puntos(), dto.referencia());
        return consultar(dto.tipoIdentificacionId(), dto.numeroIdentificacion());
    }

    @Override
    @Transactional(readOnly = true)
    public ConsultarPuntosResponseDTO consultar(Long tipoIdentificacionId, String numeroIdentificacion) {
        ClienteFidelidad cliente = buscarPorDocumento(tipoIdentificacionId, numeroIdentificacion);
        List<MovimientoPuntosDTO> movimientos = repositorioTransacciones
                .findAllByClienteIdOrderByFechaDescIdDesc(cliente.getId()).stream()
                .map(this::toMovimiento)
                .toList();
        return new ConsultarPuntosResponseDTO(
                cliente.getId(),
                cliente.getTipoIdentificacion().getCodigo(),
                cliente.getNumeroIdentificacion(),
                cliente.getNombres(),
                cliente.getApellidos(),
                cliente.getSaldoPuntos(),
                movimientos);
    }

    private ClienteFidelidad buscarPorDocumento(Long tipoIdentificacionId, String numeroIdentificacion) {
        return repositorioCliente
                .findFirstByTipoIdentificacionIdAndNumeroIdentificacionOrderByFechaRegistroDesc(
                        tipoIdentificacionId, numeroIdentificacion.trim())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "El cliente no esta inscrito en el programa de fidelidad"));
    }

    private void registrarMovimiento(ClienteFidelidad cliente, Marca marca,
                                     TipoMovimientoPuntos tipo, int puntos, String referencia) {
        TransaccionPuntos transaccion = new TransaccionPuntos();
        transaccion.setCliente(cliente);
        transaccion.setMarca(marca);
        transaccion.setTipo(tipo);
        transaccion.setPuntos(puntos);
        transaccion.setReferencia(referencia);
        transaccion.setFecha(LocalDate.now());
        repositorioTransacciones.save(transaccion);
    }

    private MovimientoPuntosDTO toMovimiento(TransaccionPuntos t) {
        return new MovimientoPuntosDTO(
                t.getId(),
                t.getTipo().name(),
                t.getMarca() == null ? "Puntos SUMAS" : t.getMarca().getNombre(),
                t.getPuntos(),
                t.getReferencia(),
                t.getFecha());
    }
}