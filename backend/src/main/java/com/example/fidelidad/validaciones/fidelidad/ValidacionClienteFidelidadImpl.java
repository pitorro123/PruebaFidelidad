package com.example.fidelidad.validaciones.fidelidad;

import com.example.fidelidad.modelos.Ciudad;
import com.example.fidelidad.modelos.Departamento;
import com.example.fidelidad.modelos.Pais;
import com.example.fidelidad.modelos.TipoIdentificacion;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.IDepartamentoRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.IPaisRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.Period;

@Component
public class ValidacionClienteFidelidadImpl implements IValidacionClienteFidelidad {

    private final IPaisRepositorio repositorioPais;
    private final IDepartamentoRepositorio repositorioDepartamento;
    private final ICiudadRepositorio repositorioCiudad;
    private final ITipoIdentificacionRepositorio repositorioTipoIdentificacion;
    private final IMarcaRepositorio repositorioMarca;
    private final IClienteFidelidadRepositorio repositorioCliente;

    public ValidacionClienteFidelidadImpl(
            IPaisRepositorio repositorioPais,
            IDepartamentoRepositorio repositorioDepartamento,
            ICiudadRepositorio repositorioCiudad,
            ITipoIdentificacionRepositorio repositorioTipoIdentificacion,
            IMarcaRepositorio repositorioMarca,
            IClienteFidelidadRepositorio repositorioCliente) {
        this.repositorioPais = repositorioPais;
        this.repositorioDepartamento = repositorioDepartamento;
        this.repositorioCiudad = repositorioCiudad;
        this.repositorioTipoIdentificacion = repositorioTipoIdentificacion;
        this.repositorioMarca = repositorioMarca;
        this.repositorioCliente = repositorioCliente;
    }

    @Override
    public void validar(String email, Long tipoIdentificacionId, String numeroIdentificacion,
                        LocalDate fechaNacimiento, Long paisId, Long departamentoId,
                        Long ciudadId, Long marcaId) {

        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El email es obligatorio");
        }
        if (!email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El formato del email es invalido");
        }

        TipoIdentificacion tipo = repositorioTipoIdentificacion.findById(tipoIdentificacionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de identificacion invalido"));

        if (!repositorioMarca.existsById(marcaId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca invalida");
        }

        Pais pais = repositorioPais.findById(paisId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pais invalido"));

        Departamento departamento = repositorioDepartamento.findById(departamentoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Departamento invalido"));

        if (!departamento.getPais().getId().equals(pais.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "El departamento no pertenece al pais seleccionado");
        }

        Ciudad ciudad = repositorioCiudad.findById(ciudadId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ciudad invalida"));

        if (!ciudad.getDepartamento().getId().equals(departamento.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La ciudad no pertenece al departamento seleccionado");
        }

        if (numeroIdentificacion == null || numeroIdentificacion.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El numero de identificacion es obligatorio");
        }

        validarFormatoIdentificacion(tipo, numeroIdentificacion);
        validarEdadMinima(fechaNacimiento);

        if (repositorioCliente.existsByTipoIdentificacionIdAndNumeroIdentificacionAndMarcaId(
                tipoIdentificacionId, numeroIdentificacion.trim(), marcaId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Esta identificacion ya esta inscrita en la marca seleccionada");
        }
    }

    private void validarFormatoIdentificacion(TipoIdentificacion tipo, String numero) {
        String numeroLimpio = numero.trim();
        switch (tipo.getCodigo()) {
            case "CC", "TI" -> {
                if (!numeroLimpio.matches("\\d{6,10}")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "La cedula/tarjeta de identidad debe ser numerica (6 a 10 digitos)");
                }
            }
            case "CE" -> {
                if (!numeroLimpio.matches("\\d{6,12}")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "La cedula de extranjeria debe ser numerica");
                }
            }
            case "NIT" -> {
                if (!numeroLimpio.matches("\\d{9,12}")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "El NIT debe contener entre 9 y 12 digitos");
                }
            }
            case "PASAPORTE" -> {
                if (!numeroLimpio.matches("[A-Za-z0-9]{6,9}")) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "El pasaporte debe ser alfanumerico (6 a 9 caracteres)");
                }
            }
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Tipo de identificacion no soportado");
        }
    }

    private void validarEdadMinima(LocalDate fechaNacimiento) {
        if (fechaNacimiento == null || fechaNacimiento.isAfter(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "La fecha de nacimiento es invalida");
        }
        int edad = Period.between(fechaNacimiento, LocalDate.now()).getYears();
        if (edad < 18) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Debes ser mayor de 18 anios para inscribirte");
        }
    }
}