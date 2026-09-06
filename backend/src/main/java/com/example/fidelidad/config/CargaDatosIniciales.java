package com.example.fidelidad.config;

import com.example.fidelidad.modelos.Ciudad;
import com.example.fidelidad.modelos.Departamento;
import com.example.fidelidad.modelos.Marca;
import com.example.fidelidad.modelos.Pais;
import com.example.fidelidad.modelos.TipoIdentificacion;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IDepartamentoRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.IPaisRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Datos semilla para el perfil por defecto (H2 en memoria).
 * Con el perfil mysql los catalogos se cargan desde el script data.sql.
 */
@Configuration
public class CargaDatosIniciales {

    @Bean
    public CommandLineRunner cargarCatalogos(
            IPaisRepositorio repositorioPais,
            IDepartamentoRepositorio repositorioDepartamento,
            ICiudadRepositorio repositorioCiudad,
            ITipoIdentificacionRepositorio repositorioTipo,
            IMarcaRepositorio repositorioMarca) {

        return args -> {
            if (repositorioMarca.count() > 0) {
                return;
            }

            repositorioMarca.save(new Marca("Americanino"));
            repositorioMarca.save(new Marca("American Eagle"));
            repositorioMarca.save(new Marca("Chevignon"));
            repositorioMarca.save(new Marca("Esprit"));
            repositorioMarca.save(new Marca("Naf Naf"));
            repositorioMarca.save(new Marca("Rifle"));

            repositorioTipo.save(new TipoIdentificacion("CC", "Cedula de Ciudadania"));
            repositorioTipo.save(new TipoIdentificacion("CE", "Cedula de Extranjeria"));
            repositorioTipo.save(new TipoIdentificacion("NIT", "NIT"));
            repositorioTipo.save(new TipoIdentificacion("PASAPORTE", "Pasaporte"));
            repositorioTipo.save(new TipoIdentificacion("TI", "Tarjeta de Identidad"));

            Pais colombia = repositorioPais.save(new Pais("Colombia"));
            Pais mexico = repositorioPais.save(new Pais("Mexico"));
            Pais chile = repositorioPais.save(new Pais("Chile"));

            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, colombia, "Antioquia",
                    "Medellin", "Bello", "Envigado", "Itagui", "Rionegro");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, colombia, "Bogota D.C.",
                    "Bogota");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, colombia, "Atlantico",
                    "Barranquilla", "Soledad", "Malambo");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, colombia, "Valle del Cauca",
                    "Cali", "Buenaventura", "Palmira");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, colombia, "Santander",
                    "Bucaramanga", "Floridablanca", "Giron");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, colombia, "Cundinamarca",
                    "Soacha", "Chia", "Zipaquiria");

            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, mexico, "Ciudad de Mexico",
                    "Ciudad de Mexico");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, mexico, "Jalisco",
                    "Guadalajara", "Zapopan");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, mexico, "Nuevo Leon",
                    "Monterrey", "Guadalupe");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, mexico, "Estado de Mexico",
                    "Ecatepec", "Toluca");

            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, chile, "Region Metropolitana",
                    "Santiago", "Providencia", "Las Condes");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, chile, "Valparaiso",
                    "Valparaiso", "Vina del Mar");
            crearDepartamentoConCiudades(repositorioDepartamento, repositorioCiudad, chile, "Biobio",
                    "Concepcion", "Talcahuano");
        };
    }

    private void crearDepartamentoConCiudades(
            IDepartamentoRepositorio repoDep, ICiudadRepositorio repoCiu,
            Pais pais, String nombreDepartamento, String... ciudades) {
        Departamento departamento = repoDep.save(new Departamento(nombreDepartamento, pais));
        for (String ciudad : ciudades) {
            repoCiu.save(new Ciudad(ciudad, departamento));
        }
    }
}