package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.campanas.CampanaRequestDTO;
import com.example.fidelidad.dtos.campanas.CampanaResponseDTO;
import com.example.fidelidad.dtos.campanas.CuponResponseDTO;
import com.example.fidelidad.servicios.campanas.IServicioCampanas;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/campanas")
@Tag(name = "Campanas", description = "Campañas del programa de fidelidad (Sumas Days, bonos de cumpleaños)")
public class CampanasControlador {

    private final IServicioCampanas servicioCampanas;

    public CampanasControlador(IServicioCampanas servicioCampanas) {
        this.servicioCampanas = servicioCampanas;
    }

    @GetMapping
    @Operation(summary = "Listar todas las campanas con su estado")
    public List<CampanaResponseDTO> listar() {
        return servicioCampanas.listar();
    }

    @GetMapping("/activas")
    @Operation(summary = "Listar campanas vigentes")
    public List<CampanaResponseDTO> listarActivas() {
        return servicioCampanas.listarActivas();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear una campana")
    public CampanaResponseDTO crear(@RequestBody CampanaRequestDTO dto) {
        return servicioCampanas.crear(dto);
    }

    @PostMapping("/bonos-cumpleanos")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Generar bonos de cumpleaños para los clientes que cumplen en el mes actual")
    public List<CuponResponseDTO> generarBonosCumpleanos() {
        return servicioCampanas.generarBonosCumpleanos();
    }
}