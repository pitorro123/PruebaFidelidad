package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.auth.LoginRequestDTO;
import com.example.fidelidad.dtos.auth.LoginResponseDTO;
import com.example.fidelidad.dtos.auth.RegistroRequestDTO;
import com.example.fidelidad.dtos.auth.RegistroResponseDTO;
import com.example.fidelidad.servicios.auth.IServicioAuth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticacion", description = "Registro y login simple (opcional)")
public class AuthControlador {

    private final IServicioAuth servicioAuth;

    public AuthControlador(IServicioAuth servicioAuth) {
        this.servicioAuth = servicioAuth;
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Registrar usuario para login")
    public RegistroResponseDTO registrar(@RequestBody RegistroRequestDTO dto) {
        return servicioAuth.registrar(dto);
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesion")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO dto) {
        return servicioAuth.login(dto);
    }
}