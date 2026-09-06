package com.example.fidelidad.servicios.catalogo;

import com.example.fidelidad.dtos.catalogo.CiudadResponseDTO;
import com.example.fidelidad.dtos.catalogo.DepartamentoResponseDTO;
import com.example.fidelidad.dtos.catalogo.MarcaResponseDTO;
import com.example.fidelidad.dtos.catalogo.PaisResponseDTO;
import com.example.fidelidad.dtos.catalogo.TipoIdentificacionResponseDTO;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IDepartamentoRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.IPaisRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ServicioCatalogoImpl implements IServicioCatalogo {

    private final IPaisRepositorio repositorioPais;
    private final IDepartamentoRepositorio repositorioDepartamento;
    private final ICiudadRepositorio repositorioCiudad;
    private final ITipoIdentificacionRepositorio repositorioTipoIdentificacion;
    private final IMarcaRepositorio repositorioMarca;

    public ServicioCatalogoImpl(
            IPaisRepositorio repositorioPais,
            IDepartamentoRepositorio repositorioDepartamento,
            ICiudadRepositorio repositorioCiudad,
            ITipoIdentificacionRepositorio repositorioTipoIdentificacion,
            IMarcaRepositorio repositorioMarca) {
        this.repositorioPais = repositorioPais;
        this.repositorioDepartamento = repositorioDepartamento;
        this.repositorioCiudad = repositorioCiudad;
        this.repositorioTipoIdentificacion = repositorioTipoIdentificacion;
        this.repositorioMarca = repositorioMarca;
    }

    @Override
    public List<PaisResponseDTO> listarPaises() {
        return repositorioPais.findAllByOrderByNombreAsc().stream()
                .map(p -> PaisResponseDTO.from(p.getId(), p.getNombre()))
                .toList();
    }

    @Override
    public List<DepartamentoResponseDTO> listarDepartamentos(Long paisId) {
        if (!repositorioPais.existsById(paisId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pais no encontrado");
        }
        return repositorioDepartamento.findByPaisIdOrderByNombreAsc(paisId).stream()
                .map(d -> DepartamentoResponseDTO.from(d.getId(), d.getPais().getId(), d.getNombre()))
                .toList();
    }

    @Override
    public List<CiudadResponseDTO> listarCiudades(Long departamentoId) {
        if (!repositorioDepartamento.existsById(departamentoId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Departamento no encontrado");
        }
        return repositorioCiudad.findByDepartamentoIdOrderByNombreAsc(departamentoId).stream()
                .map(c -> CiudadResponseDTO.from(c.getId(), c.getDepartamento().getId(), c.getNombre()))
                .toList();
    }

    @Override
    public List<TipoIdentificacionResponseDTO> listarTiposIdentificacion() {
        return repositorioTipoIdentificacion.findAllByOrderByNombreAsc().stream()
                .map(t -> TipoIdentificacionResponseDTO.from(t.getId(), t.getCodigo(), t.getNombre()))
                .toList();
    }

    @Override
    public List<MarcaResponseDTO> listarMarcas() {
        return repositorioMarca.findAllByOrderByNombreAsc().stream()
                .map(m -> MarcaResponseDTO.from(m.getId(), m.getNombre()))
                .toList();
    }
}