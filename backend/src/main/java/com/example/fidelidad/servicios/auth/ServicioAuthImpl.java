package com.example.fidelidad.servicios.auth;

import com.example.fidelidad.dtos.auth.LoginRequestDTO;
import com.example.fidelidad.dtos.auth.LoginResponseDTO;
import com.example.fidelidad.dtos.auth.RegistroRequestDTO;
import com.example.fidelidad.dtos.auth.RegistroResponseDTO;
import com.example.fidelidad.modelos.Usuario;
import com.example.fidelidad.repositorios.IUsuarioRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ServicioAuthImpl implements IServicioAuth {

    private final IUsuarioRepositorio repositorioUsuario;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ServicioAuthImpl(IUsuarioRepositorio repositorioUsuario) {
        this.repositorioUsuario = repositorioUsuario;
    }

    @Override
    public RegistroResponseDTO registrar(RegistroRequestDTO dto) {
        if (dto.email() == null || dto.email().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio");
        }
        if (dto.password() == null || dto.password().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contrasena debe tener al menos 6 caracteres");
        }
        if (repositorioUsuario.existsByEmailIgnoreCase(dto.email().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya esta registrado");
        }
        Usuario usuario = new Usuario(dto.email().trim().toLowerCase(), passwordEncoder.encode(dto.password()));
        Usuario guardado = repositorioUsuario.save(usuario);
        return new RegistroResponseDTO(guardado.getId(), guardado.getEmail());
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO dto) {
        Usuario usuario = repositorioUsuario.findByEmailIgnoreCase(dto.email() == null ? "" : dto.email().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales invalidas"));

        if (!passwordEncoder.matches(dto.password(), usuario.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales invalidas");
        }
        return new LoginResponseDTO(true, usuario.getEmail(), "Autenticado correctamente");
    }
}