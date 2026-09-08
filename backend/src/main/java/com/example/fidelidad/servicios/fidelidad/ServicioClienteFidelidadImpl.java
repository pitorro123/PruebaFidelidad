package com.example.fidelidad.servicios.fidelidad;

import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadRequestDTO;
import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadResponseDTO;
import com.example.fidelidad.modelos.Ciudad;
import com.example.fidelidad.modelos.ClienteFidelidad;
import com.example.fidelidad.modelos.Cupon;
import com.example.fidelidad.modelos.EstadoCupon;
import com.example.fidelidad.modelos.TipoCupon;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.ICuponRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import com.example.fidelidad.servicios.correo.IServicioCorreo;
import com.example.fidelidad.validaciones.fidelidad.IValidacionClienteFidelidad;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
public class ServicioClienteFidelidadImpl implements IServicioClienteFidelidad {

    private final IClienteFidelidadRepositorio repositorioCliente;
    private final ITipoIdentificacionRepositorio repositorioTipo;
    private final ICiudadRepositorio repositorioCiudad;
    private final IMarcaRepositorio repositorioMarca;
    private final ICuponRepositorio repositorioCupon;
    private final IValidacionClienteFidelidad validador;
    private final IServicioCorreo servicioCorreo;

    private static final int DESCUENTO_BONO_CUMPLEANOS = 20;

    public ServicioClienteFidelidadImpl(
            IClienteFidelidadRepositorio repositorioCliente,
            ITipoIdentificacionRepositorio repositorioTipo,
            ICiudadRepositorio repositorioCiudad,
            IMarcaRepositorio repositorioMarca,
            ICuponRepositorio repositorioCupon,
            IValidacionClienteFidelidad validador,
            IServicioCorreo servicioCorreo) {
        this.repositorioCliente = repositorioCliente;
        this.repositorioTipo = repositorioTipo;
        this.repositorioCiudad = repositorioCiudad;
        this.repositorioMarca = repositorioMarca;
        this.repositorioCupon = repositorioCupon;
        this.validador = validador;
        this.servicioCorreo = servicioCorreo;
    }

    @Override
    @Transactional
    public ClienteFidelidadResponseDTO crear(ClienteFidelidadRequestDTO dto) {
        validador.validar(
                dto.email(),
                dto.tipoIdentificacionId(),
                dto.numeroIdentificacion(),
                dto.fechaNacimiento(),
                dto.paisId(),
                dto.departamentoId(),
                dto.ciudadId(),
                dto.marcaId());

        ClienteFidelidad cliente = new ClienteFidelidad();
        cliente.setEmail(dto.email().trim().toLowerCase());
        cliente.setTipoIdentificacion(repositorioTipo.findById(dto.tipoIdentificacionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de identificacion invalido")));
        cliente.setNumeroIdentificacion(dto.numeroIdentificacion().trim());
        cliente.setNombres(dto.nombres().trim());
        cliente.setApellidos(dto.apellidos().trim());
        cliente.setFechaNacimiento(dto.fechaNacimiento());
        cliente.setDireccion(dto.direccion().trim());

        Ciudad ciudad = repositorioCiudad.findById(dto.ciudadId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ciudad invalida"));
        cliente.setCiudad(ciudad);
        cliente.setDepartamento(ciudad.getDepartamento());
        cliente.setPais(ciudad.getDepartamento().getPais());

        cliente.setMarca(repositorioMarca.findById(dto.marcaId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca invalida")));
        cliente.setFechaRegistro(LocalDate.now());

        ClienteFidelidad guardado = repositorioCliente.save(cliente);
        Cupon bonoCumpleanos = crearBonoCumpleanos(guardado);
        servicioCorreo.enviarBienvenidaConBono(guardado.getEmail(), guardado.getNombres(),
                guardado.getMarca().getNombre(), bonoCumpleanos);
        return toResponse(guardado);
    }

    private Cupon crearBonoCumpleanos(ClienteFidelidad cliente) {
        Cupon cupon = new Cupon();
        cupon.setCliente(cliente);
        cupon.setTipo(TipoCupon.CUMPLEANOS);
        cupon.setCodigo("FELIZ-MES-" + cliente.getId());
        cupon.setDescuentoPorcentaje(DESCUENTO_BONO_CUMPLEANOS);
        cupon.setFechaExpiracion(ultimoDiaDelMes(LocalDate.now()));
        cupon.setEstado(EstadoCupon.ACTIVO);
        return repositorioCupon.save(cupon);
    }

    private LocalDate ultimoDiaDelMes(LocalDate fecha) {
        return fecha.withDayOfMonth(fecha.lengthOfMonth());
    }

    private ClienteFidelidadResponseDTO toResponse(ClienteFidelidad c) {
        return new ClienteFidelidadResponseDTO(
                c.getId(),
                c.getTipoIdentificacion().getCodigo(),
                c.getTipoIdentificacion().getNombre(),
                c.getNumeroIdentificacion(),
                c.getNombres(),
                c.getApellidos(),
                c.getFechaNacimiento(),
                c.getDireccion(),
                c.getCiudad().getNombre(),
                c.getDepartamento().getNombre(),
                c.getPais().getNombre(),
                c.getMarca().getNombre(),
                c.getFechaRegistro());
    }
}