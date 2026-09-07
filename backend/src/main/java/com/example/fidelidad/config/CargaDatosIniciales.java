package com.example.fidelidad.config;

import com.example.fidelidad.modelos.Ciudad;
import com.example.fidelidad.modelos.Departamento;
import com.example.fidelidad.modelos.Marca;
import com.example.fidelidad.modelos.Pais;
import com.example.fidelidad.modelos.Producto;
import com.example.fidelidad.modelos.TipoIdentificacion;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IDepartamentoRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.IPaisRepositorio;
import com.example.fidelidad.repositorios.IProductoRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CargaDatosIniciales {

    @Bean
    public CommandLineRunner cargarCatalogos(
            IPaisRepositorio repositorioPais,
            IDepartamentoRepositorio repositorioDepartamento,
            ICiudadRepositorio repositorioCiudad,
            ITipoIdentificacionRepositorio repositorioTipo,
            IMarcaRepositorio repositorioMarca,
            IProductoRepositorio repositorioProducto) {

        return args -> {
            if (repositorioMarca.count() > 0) {
                return;
            }

            Marca americanino = repositorioMarca.save(new Marca("Americanino"));
            Marca americanEagle = repositorioMarca.save(new Marca("American Eagle"));
            Marca chevignon = repositorioMarca.save(new Marca("Chevignon"));
            Marca esprit = repositorioMarca.save(new Marca("Esprit"));
            Marca nafNaf = repositorioMarca.save(new Marca("Naf Naf"));
            Marca rifle = repositorioMarca.save(new Marca("Rifle"));

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

            sembrarProductos(repositorioProducto, americanino, americanEagle, chevignon,
                    esprit, nafNaf, rifle);
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

    private void sembrarProductos(
            IProductoRepositorio repoProducto,
            Marca americanino, Marca americanEagle, Marca chevignon,
            Marca esprit, Marca nafNaf, Marca rifle) {
        repoProducto.save(new Producto("Chaqueta de mezclilla negra Levi's", "Chaquetas", "M", "Negro",
                americanino, 180000, "Nuevo", "Unisex", urlImagen(1)));
        repoProducto.save(new Producto("Vestido rojo escote cruzado", "Vestidos", "S", "Rojo",
                nafNaf, 89000, "Nuevo", "Mujer", urlImagen(2)));
        repoProducto.save(new Producto("Jeans azules corte mom fit", "Pantalones", "M", "Azul",
                rifle, 120000, "Excelente", "Mujer", urlImagen(3)));
        repoProducto.save(new Producto("Blusa beige manga abullonada", "Blusas", "S", "Beige",
                esprit, 75000, "Nuevo", "Mujer", urlImagen(4)));
        repoProducto.save(new Producto("Polo blanco Adidas", "Camisas", "L", "Blanco",
                americanEagle, 130000, "Nuevo", "Hombre", urlImagen(5)));
        repoProducto.save(new Producto("Falda plisada rosada", "Faldas", "S", "Rosa",
                nafNaf, 68000, "Muy bueno", "Mujer", urlImagen(6)));
        repoProducto.save(new Producto("Tenis Nike azules con gorra Adidas beige", "Zapatos", "M", "Azul",
                americanEagle, 175000, "Nuevo", "Hombre", urlImagen(7)));
        repoProducto.save(new Producto("Pantalón cargo negro", "Pantalones", "M", "Negro",
                chevignon, 95000, "Nuevo", "Unisex", urlImagen(8)));
        repoProducto.save(new Producto("Chaqueta cortavientos roja Nike", "Chaquetas", "M", "Rojo",
                americanEagle, 160000, "Nuevo", "Unisex", urlImagen(9)));
        repoProducto.save(new Producto("Camisa de cuadros azul", "Camisas", "L", "Azul",
                chevignon, 89000, "Muy bueno", "Hombre", urlImagen(10)));
        repoProducto.save(new Producto("Minifalda de mezclilla blanca", "Faldas", "S", "Blanco",
                rifle, 78000, "Excelente", "Mujer", urlImagen(11)));
        repoProducto.save(new Producto("Tenis Nike rosados", "Zapatos", "M", "Rosa",
                americanEagle, 145000, "Nuevo", "Mujer", urlImagen(12)));
        repoProducto.save(new Producto("Cinturón de cuero negro", "Accesorios", "M", "Negro",
                chevignon, 45000, "Nuevo", "Unisex", urlImagen(13)));
        repoProducto.save(new Producto("Pantalón cargo verde", "Pantalones", "M", "Verde",
                americanino, 98000, "Nuevo", "Unisex", urlImagen(14)));
        repoProducto.save(new Producto("Trench coat beige", "Chaquetas", "M", "Beige",
                esprit, 320000, "Nuevo", "Mujer", urlImagen(15)));
        repoProducto.save(new Producto("Vestido amarillo infantil", "Vestidos", "XS", "Amarillo",
                nafNaf, 55000, "Nuevo", "Niño", urlImagen(16)));
        repoProducto.save(new Producto("Blusa negra de encaje", "Blusas", "S", "Negro",
                esprit, 82000, "Muy bueno", "Mujer", urlImagen(17)));
        repoProducto.save(new Producto("Camisa a rayas blanco y azul", "Camisas", "M", "Blanco",
                americanino, 90000, "Nuevo", "Mujer", urlImagen(18)));
    }

    private String urlImagen(int numero) {
        return "https://res.cloudinary.com/zslcesok/image/upload/v1788317585/prenda_"
                + String.format("%02d", numero) + ".png";
    }
}