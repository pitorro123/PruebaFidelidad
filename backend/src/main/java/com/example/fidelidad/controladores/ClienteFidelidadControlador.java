package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadRequestDTO;
import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadResponseDTO;
import com.example.fidelidad.dtos.fidelidad.VerificacionRequestDTO;
import com.example.fidelidad.dtos.fidelidad.VerificacionResponseDTO;
import com.example.fidelidad.servicios.fidelidad.IServicioClienteFidelidad;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Endpoints del registro de clientes al programa de fidelidad.
 */
@RestController
@RequestMapping("/api/clientes-fidelidad")
@Tag(name = "Clientes Fidelidad", description = "Inscripcion al programa de fidelidad")
public class ClienteFidelidadControlador {

    private final IServicioClienteFidelidad servicioCliente;

    public ClienteFidelidadControlador(IServicioClienteFidelidad servicioCliente) {
        this.servicioCliente = servicioCliente;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar un cliente en el programa de fidelidad")
    public ClienteFidelidadResponseDTO registrar(@RequestBody ClienteFidelidadRequestDTO dto) {
        return servicioCliente.crear(dto);
    }

    @PostMapping("/verificar")
    @Operation(summary = "Verificar si una identificacion ya esta inscrita en una marca")
    public VerificacionResponseDTO verificar(@RequestBody VerificacionRequestDTO dto) {
        return servicioCliente.verificar(dto);
    }

    @GetMapping
    @Operation(summary = "Listar clientes inscritos")
    public List<ClienteFidelidadResponseDTO> listar() {
        return servicioCliente.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar un cliente inscrito por id")
    public ClienteFidelidadResponseDTO buscarPorId(@PathVariable Long id) {
        return servicioCliente.buscarPorId(id);
    }
}