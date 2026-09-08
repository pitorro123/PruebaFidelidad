package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.puntos.AcumularPuntosRequestDTO;
import com.example.fidelidad.dtos.puntos.CanjearPuntosRequestDTO;
import com.example.fidelidad.dtos.puntos.ConsultarPuntosResponseDTO;
import com.example.fidelidad.servicios.puntos.IServicioPuntos;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/puntos")
@Tag(name = "Puntos SUMAS", description = "Programa de puntos de fidelidad del grupo")
public class PuntosControlador {

    private final IServicioPuntos servicioPuntos;

    public PuntosControlador(IServicioPuntos servicioPuntos) {
        this.servicioPuntos = servicioPuntos;
    }

    @PostMapping("/acumular")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Acumular puntos al registrar una compra (1 punto por cada $1 COP)")
    public ConsultarPuntosResponseDTO acumular(@RequestBody AcumularPuntosRequestDTO dto) {
        return servicioPuntos.acumular(dto);
    }

    @PostMapping("/canjear")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Canjear puntos (saldo minimo de 10.000 SUMAS)")
    public ConsultarPuntosResponseDTO canjear(@RequestBody CanjearPuntosRequestDTO dto) {
        return servicioPuntos.canjear(dto);
    }

    @GetMapping
    @Operation(summary = "Consultar saldo e historial de puntos por documento")
    public ConsultarPuntosResponseDTO consultar(
            @RequestParam Long tipoIdentificacionId,
            @RequestParam String numeroIdentificacion) {
        return servicioPuntos.consultar(tipoIdentificacionId, numeroIdentificacion);
    }
}