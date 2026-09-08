package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.campanas.CuponResponseDTO;
import com.example.fidelidad.dtos.campanas.UsarCuponRequestDTO;
import com.example.fidelidad.servicios.campanas.IServicioCampanas;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cupones")
@Tag(name = "Cupones", description = "Cupones y bonos de los clientes del programa de fidelidad")
public class CuponesControlador {

    private final IServicioCampanas servicioCampanas;

    public CuponesControlador(IServicioCampanas servicioCampanas) {
        this.servicioCampanas = servicioCampanas;
    }

    @GetMapping
    @Operation(summary = "Listar los cupones de un cliente por documento")
    public List<CuponResponseDTO> listarCupones(
            @RequestParam Long tipoIdentificacionId,
            @RequestParam String numeroIdentificacion) {
        return servicioCampanas.listarCupones(tipoIdentificacionId, numeroIdentificacion);
    }

    @PostMapping("/usar")
    @Operation(summary = "Marcar un cupon como utilizado")
    public CuponResponseDTO usarCupon(@RequestBody UsarCuponRequestDTO dto) {
        return servicioCampanas.usarCupon(dto.codigo());
    }
}