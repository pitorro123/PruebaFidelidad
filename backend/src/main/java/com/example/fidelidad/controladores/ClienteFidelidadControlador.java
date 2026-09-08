package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadRequestDTO;
import com.example.fidelidad.dtos.fidelidad.ClienteFidelidadResponseDTO;
import com.example.fidelidad.servicios.fidelidad.IServicioClienteFidelidad;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
}