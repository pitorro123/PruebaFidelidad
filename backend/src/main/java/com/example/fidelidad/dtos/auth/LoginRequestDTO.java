package com.example.fidelidad.dtos.auth;

public record LoginRequestDTO(
        String email,
        String password
) {
}