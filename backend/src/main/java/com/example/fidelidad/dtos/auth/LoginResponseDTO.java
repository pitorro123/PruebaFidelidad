package com.example.fidelidad.dtos.auth;

public record LoginResponseDTO(
        boolean autenticado,
        String email,
        String mensaje
) {
}