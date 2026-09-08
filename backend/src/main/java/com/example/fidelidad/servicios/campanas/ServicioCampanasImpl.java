package com.example.fidelidad.servicios.campanas;

import com.example.fidelidad.dtos.campanas.CampanaRequestDTO;
import com.example.fidelidad.dtos.campanas.CampanaResponseDTO;
import com.example.fidelidad.dtos.campanas.CuponResponseDTO;
import com.example.fidelidad.modelos.Campana;
import com.example.fidelidad.modelos.ClienteFidelidad;
import com.example.fidelidad.modelos.Cupon;
import com.example.fidelidad.modelos.EstadoCupon;
import com.example.fidelidad.modelos.TipoCupon;
import com.example.fidelidad.repositorios.ICampanaRepositorio;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.ICuponRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServicioCampanasImpl implements IServicioCampanas {

    private static final int DESCUENTO_BONO_CUMPLEANOS = 20;

    private final ICampanaRepositorio repositorioCampana;
    private final ICuponRepositorio repositorioCupon;
    private final IClienteFidelidadRepositorio repositorioCliente;

    public ServicioCampanasImpl(
            ICampanaRepositorio repositorioCampana,
            ICuponRepositorio repositorioCupon,
            IClienteFidelidadRepositorio repositorioCliente) {
        this.repositorioCampana = repositorioCampana;
        this.repositorioCupon = repositorioCupon;
        this.repositorioCliente = repositorioCliente;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CampanaResponseDTO> listar() {
        return repositorioCampana.findAllByOrderByFechaInicioDesc().stream()
                .map(this::toCampanaResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CampanaResponseDTO> listarActivas() {
        return repositorioCampana
                .findByFechaInicioLessThanEqualAndFechaFinGreaterThanEqualOrderByFechaInicioDesc(
                        LocalDate.now(), LocalDate.now())
                .stream()
                .map(this::toCampanaResponse)
                .toList();
    }

    @Override
    @Transactional
    public CampanaResponseDTO crear(CampanaRequestDTO dto) {
        if (dto.nombre() == null || dto.nombre().isBlank()
                || dto.fechaInicio() == null || dto.fechaFin() == null
                || dto.descuentoPorcentaje() == null || dto.descuentoPorcentaje() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos de campana invalidos");
        }
        if (dto.fechaFin().isBefore(dto.fechaInicio())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La fecha de fin debe ser posterior a la de inicio");
        }
        Campana campana = new Campana(
                dto.nombre().trim(),
                dto.descripcion() == null ? "" : dto.descripcion().trim(),
                dto.fechaInicio(),
                dto.fechaFin(),
                dto.descuentoPorcentaje());
        return toCampanaResponse(repositorioCampana.save(campana));
    }

    @Override
    @Transactional
    public List<CuponResponseDTO> generarBonosCumpleanos() {
        LocalDate hoy = LocalDate.now();
        List<CuponResponseDTO> generados = new ArrayList<>();
        for (ClienteFidelidad cliente : repositorioCliente.findAllPorMesDeNacimiento(hoy.getMonthValue())) {
            if (repositorioCupon.existsByClienteIdAndTipoAndEstado(
                    cliente.getId(), TipoCupon.CUMPLEANOS, EstadoCupon.ACTIVO)) {
                continue;
            }
            Cupon cupon = new Cupon();
            cupon.setCliente(cliente);
            cupon.setTipo(TipoCupon.CUMPLEANOS);
            cupon.setCodigo("FELIZ-MES-" + cliente.getId());
            cupon.setDescuentoPorcentaje(DESCUENTO_BONO_CUMPLEANOS);
            cupon.setFechaExpiracion(ultimoDiaDelMes(hoy));
            cupon.setEstado(EstadoCupon.ACTIVO);
            generados.add(toCuponResponse(repositorioCupon.save(cupon)));
        }
        return generados;
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

    private LocalDate ultimoDiaDelMes(LocalDate fecha) {
        return fecha.withDayOfMonth(fecha.lengthOfMonth());
    }

    private EstadoCupon estadoEfectivo(Cupon cupon) {
        if (cupon.getEstado() != EstadoCupon.ACTIVO) {
            return cupon.getEstado();
        }
        return cupon.getFechaExpiracion().isBefore(LocalDate.now()) ? EstadoCupon.EXPIRADO : EstadoCupon.ACTIVO;
    }

    private String estadoCampana(Campana campana) {
        LocalDate hoy = LocalDate.now();
        if (hoy.isBefore(campana.getFechaInicio())) return "PROXIMA";
        if (hoy.isAfter(campana.getFechaFin())) return "FINALIZADA";
        return "ACTIVA";
    }

    private CampanaResponseDTO toCampanaResponse(Campana c) {
        return new CampanaResponseDTO(
                c.getId(),
                c.getNombre(),
                c.getDescripcion(),
                c.getFechaInicio(),
                c.getFechaFin(),
                c.getDescuentoPorcentaje(),
                estadoCampana(c));
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