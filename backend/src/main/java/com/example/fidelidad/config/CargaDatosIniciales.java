package com.example.fidelidad.config;

import com.example.fidelidad.modelos.Campana;
import com.example.fidelidad.modelos.Ciudad;
import com.example.fidelidad.modelos.ClienteFidelidad;
import com.example.fidelidad.modelos.Cupon;
import com.example.fidelidad.modelos.Departamento;
import com.example.fidelidad.modelos.EstadoCupon;
import com.example.fidelidad.modelos.Marca;
import com.example.fidelidad.modelos.Pais;
import com.example.fidelidad.modelos.Producto;
import com.example.fidelidad.modelos.TipoCupon;
import com.example.fidelidad.modelos.TipoIdentificacion;
import com.example.fidelidad.modelos.TipoMovimientoPuntos;
import com.example.fidelidad.modelos.TransaccionPuntos;
import com.example.fidelidad.repositorios.ICampanaRepositorio;
import com.example.fidelidad.repositorios.ICiudadRepositorio;
import com.example.fidelidad.repositorios.IClienteFidelidadRepositorio;
import com.example.fidelidad.repositorios.ICuponRepositorio;
import com.example.fidelidad.repositorios.IDepartamentoRepositorio;
import com.example.fidelidad.repositorios.IMarcaRepositorio;
import com.example.fidelidad.repositorios.IPaisRepositorio;
import com.example.fidelidad.repositorios.IProductoRepositorio;
import com.example.fidelidad.repositorios.ITipoIdentificacionRepositorio;
import com.example.fidelidad.repositorios.ITransaccionPuntosRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDate;

@Configuration
public class CargaDatosIniciales {

    @Bean
    public CommandLineRunner cargarCatalogos(
            IPaisRepositorio repositorioPais,
            IDepartamentoRepositorio repositorioDepartamento,
            ICiudadRepositorio repositorioCiudad,
            ITipoIdentificacionRepositorio repositorioTipo,
            IMarcaRepositorio repositorioMarca,
            IProductoRepositorio repositorioProducto,
            IClienteFidelidadRepositorio repositorioCliente,
            ITransaccionPuntosRepositorio repositorioTransacciones,
            ICampanaRepositorio repositorioCampana,
            ICuponRepositorio repositorioCupon,
            PlatformTransactionManager transactionManager) {

        TransactionTemplate transaccion = new TransactionTemplate(transactionManager);
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

            TipoIdentificacion cc = repositorioTipo.save(new TipoIdentificacion("CC", "Cedula de Ciudadania"));
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

            transaccion.executeWithoutResult(status -> sembrarClienteDePrueba(
                        repositorioCliente, repositorioTransacciones,
                        repositorioCiudad, repositorioCampana, repositorioCupon,
                        cc, chevignon, americanEagle));
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

    private void sembrarClienteDePrueba(
            IClienteFidelidadRepositorio repoCliente,
            ITransaccionPuntosRepositorio repoTransacciones,
            ICiudadRepositorio repoCiudad,
            ICampanaRepositorio repoCampana,
            ICuponRepositorio repoCupon,
            TipoIdentificacion cc,
            Marca chevignon,
            Marca americanEagle) {
        if (repoCliente.count() > 0) {
            return;
        }
        Ciudad medellin = repoCiudad.findFirstByNombre("Medellin").orElseThrow();

        ClienteFidelidad cliente = new ClienteFidelidad();
        cliente.setEmail("ana.gomez@correo.com");
        cliente.setTipoIdentificacion(cc);
        cliente.setNumeroIdentificacion("1000000001");
        cliente.setNombres("Ana Sofia");
        cliente.setApellidos("Gomez Ruiz");
        cliente.setFechaNacimiento(LocalDate.of(1995, LocalDate.now().getMonthValue(), 15));
        cliente.setDireccion("Carrera 70 # 45 - 12");
        cliente.setCiudad(medellin);
        cliente.setDepartamento(medellin.getDepartamento());
        cliente.setPais(medellin.getDepartamento().getPais());
        cliente.setMarca(chevignon);
        cliente.setFechaRegistro(LocalDate.now().minusMonths(3));
        cliente.setSaldoPuntos(15_000);
        repoCliente.save(cliente);

        registrarCompra(repoTransacciones, cliente, chevignon, 5_000,
                "TICKET-10001", LocalDate.now().minusDays(40));
        registrarCompra(repoTransacciones, cliente, americanEagle, 6_500,
                "TICKET-10002", LocalDate.now().minusDays(20));
        registrarCompra(repoTransacciones, cliente, chevignon, 3_500,
                "TICKET-10003", LocalDate.now().minusDays(5));

        LocalDate hoy = LocalDate.now();
        Campana sumasDays = repoCampana.save(new Campana(
                "Sumas Days",
                "Descuento especial de temporada para los miembros del club",
                hoy.minusDays(2),
                hoy.plusDays(10),
                40));

        cuponDePrueba(repoCupon, cliente, sumasDays, TipoCupon.SUMAS_DAYS,
                "SUMAS-40-" + cliente.getId(), 40, hoy.plusDays(10));
        cuponDePrueba(repoCupon, cliente, null, TipoCupon.CUMPLEANOS,
                "FELIZ-MES-" + cliente.getId(), 20, ultimoDiaDelMes(hoy));
    }

    private void cuponDePrueba(
            ICuponRepositorio repoCupon,
            ClienteFidelidad cliente,
            Campana campana,
            TipoCupon tipo,
            String codigo,
            int descuento,
            LocalDate fechaExpiracion) {
        Cupon cupon = new Cupon();
        cupon.setCliente(cliente);
        cupon.setCampana(campana);
        cupon.setTipo(tipo);
        cupon.setCodigo(codigo);
        cupon.setDescuentoPorcentaje(descuento);
        cupon.setFechaExpiracion(fechaExpiracion);
        cupon.setEstado(EstadoCupon.ACTIVO);
        repoCupon.save(cupon);
    }

    private LocalDate ultimoDiaDelMes(LocalDate fecha) {
        return fecha.withDayOfMonth(fecha.lengthOfMonth());
    }

    private void registrarCompra(
            ITransaccionPuntosRepositorio repoTransacciones,
            ClienteFidelidad cliente,
            Marca marca,
            int valorCompra,
            String referencia,
            LocalDate fecha) {
        TransaccionPuntos transaccion = new TransaccionPuntos();
        transaccion.setCliente(cliente);
        transaccion.setMarca(marca);
        transaccion.setTipo(TipoMovimientoPuntos.ACUMULACION);
        transaccion.setPuntos(valorCompra);
        transaccion.setReferencia(referencia);
        transaccion.setFecha(fecha);
        repoTransacciones.save(transaccion);
    }
}