package com.example.fidelidad.controladores;

import com.example.fidelidad.dtos.catalogo.ProductoResponseDTO;
import com.example.fidelidad.servicios.producto.IServicioProducto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "Catalogo de productos consultado desde la base de datos")
public class ProductoControlador {

    private final IServicioProducto servicioProducto;

    public ProductoControlador(IServicioProducto servicioProducto) {
        this.servicioProducto = servicioProducto;
    }

    @GetMapping
    @Operation(summary = "Listar productos del catalogo (opcional: filtrar por termino con ?q=)")
    public List<ProductoResponseDTO> listar(@RequestParam(required = false) String q) {
        return servicioProducto.buscar(q);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar un producto por id")
    public ProductoResponseDTO buscarPorId(@PathVariable Long id) {
        return servicioProducto.buscarPorId(id);
    }
}