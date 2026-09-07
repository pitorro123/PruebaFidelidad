package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.catalogo.CiudadResponseDTO;
import com.example.fidelidad.dtos.catalogo.DepartamentoResponseDTO;
import com.example.fidelidad.dtos.catalogo.MarcaResponseDTO;
import com.example.fidelidad.dtos.catalogo.PaisResponseDTO;
import com.example.fidelidad.dtos.catalogo.TipoIdentificacionResponseDTO;
import com.example.fidelidad.servicios.catalogo.IServicioCatalogo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/catalogos")
@Tag(name = "Catalogos", description = "Listas desplegables consultadas desde la base de datos")
public class CatalogoControlador {

    private final IServicioCatalogo servicioCatalogo;

    public CatalogoControlador(IServicioCatalogo servicioCatalogo) {
        this.servicioCatalogo = servicioCatalogo;
    }

    @GetMapping("/paises")
    @Operation(summary = "Listar paises para el desplegable 'Pais'")
    public List<PaisResponseDTO> listarPaises() {
        return servicioCatalogo.listarPaises();
    }

    @GetMapping("/paises/{paisId}/departamentos")
    @Operation(summary = "Listar departamentos de un pais")
    public List<DepartamentoResponseDTO> listarDepartamentos(@PathVariable Long paisId) {
        return servicioCatalogo.listarDepartamentos(paisId);
    }

    @GetMapping("/departamentos/{departamentoId}/ciudades")
    @Operation(summary = "Listar ciudades de un departamento")
    public List<CiudadResponseDTO> listarCiudades(@PathVariable Long departamentoId) {
        return servicioCatalogo.listarCiudades(departamentoId);
    }

    @GetMapping("/tipos-identificacion")
    @Operation(summary = "Listar tipos de identificacion")
    public List<TipoIdentificacionResponseDTO> listarTiposIdentificacion() {
        return servicioCatalogo.listarTiposIdentificacion();
    }

    @GetMapping("/marcas")
    @Operation(summary = "Listar marcas del grupo")
    public List<MarcaResponseDTO> listarMarcas() {
        return servicioCatalogo.listarMarcas();
    }
}