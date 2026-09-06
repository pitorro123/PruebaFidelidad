package com.example.fidelidad.servicios.auth;

import com.example.fidelidad.dtos.auth.LoginRequestDTO;
import com.example.fidelidad.dtos.auth.LoginResponseDTO;
import com.example.fidelidad.dtos.auth.RegistroRequestDTO;
import com.example.fidelidad.dtos.auth.RegistroResponseDTO;

public interface IServicioAuth {

    RegistroResponseDTO registrar(RegistroRequestDTO dto);

    LoginResponseDTO login(LoginRequestDTO dto);
}