package com.example.fidelidad.servicios.fidelidad;

import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadRequestDTO;
import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadResponseDTO;
import com.example.fidelidad.dtos.fidelidad.VerificacionRequestDTO;
import com.example.fidelidad.dtos.fidelidad.VerificacionResponseDTO;
import com.example.fidelidad.modelos.Ciudad;
import com.example.fidelidad.modelos.ClienteFidelidad;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import com.example.fidelidad.validaciones.fidelidad.IValidacionClienteFidelidad;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class ServicioClienteFidelidadImpl implements IServicioClienteFidelidad {

    private final IClienteFidelidadRepositorio repositorioCliente;
    private final ITipoIdentificacionRepositorio repositorioTipo;
    private final ICiudadRepositorio repositorioCiudad;
    private final IMarcaRepositorio repositorioMarca;
    private final IValidacionClienteFidelidad validador;

    public ServicioClienteFidelidadImpl(
            IClienteFidelidadRepositorio repositorioCliente,
            ITipoIdentificacionRepositorio repositorioTipo,
            ICiudadRepositorio repositorioCiudad,
            IMarcaRepositorio repositorioMarca,
            IValidacionClienteFidelidad validador) {
        this.repositorioCliente = repositorioCliente;
        this.repositorioTipo = repositorioTipo;
        this.repositorioCiudad = repositorioCiudad;
        this.repositorioMarca = repositorioMarca;
        this.validador = validador;
    }

    @Override
    @Transactional
    public ClienteFidelidadResponseDTO crear(ClienteFidelidadRequestDTO dto) {
        validador.validar(
                dto.tipoIdentificacionId(),
                dto.numeroIdentificacion(),
                dto.fechaNacimiento(),
                dto.paisId(),
                dto.departamentoId(),
                dto.ciudadId(),
                dto.marcaId());

        ClienteFidelidad cliente = new ClienteFidelidad();
        cliente.setTipoIdentificacion(repositorioTipo.findById(dto.tipoIdentificacionId()).orElseThrow());
        cliente.setNumeroIdentificacion(dto.numeroIdentificacion().trim());
        cliente.setNombres(dto.nombres().trim());
        cliente.setApellidos(dto.apellidos().trim());
        cliente.setFechaNacimiento(dto.fechaNacimiento());
        cliente.setDireccion(dto.direccion().trim());

        Ciudad ciudad = repositorioCiudad.findById(dto.ciudadId()).orElseThrow();
        cliente.setCiudad(ciudad);
        cliente.setDepartamento(ciudad.getDepartamento());
        cliente.setPais(ciudad.getDepartamento().getPais());

        cliente.setMarca(repositorioMarca.findById(dto.marcaId()).orElseThrow());
        cliente.setFechaRegistro(LocalDate.now());

        return toResponse(repositorioCliente.save(cliente));
    }

    @Override
    public VerificacionResponseDTO verificar(VerificacionRequestDTO dto) {
        boolean inscrito = repositorioCliente
                .existsByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaId(
                        dto.tipoIdentificacionId(), dto.numeroIdentificacion().trim(), dto.marcaId());
        return new VerificacionResponseDTO(inscrito, null);
    }

    @Override
    public List<ClienteFidelidadResponseDTO> listar() {
        return repositorioCliente.findAllByOrderByFechaRegistroDesc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public ClienteFidelidadResponseDTO buscarPorId(Long id) {
        ClienteFidelidad cliente = repositorioCliente.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
        return toResponse(cliente);
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