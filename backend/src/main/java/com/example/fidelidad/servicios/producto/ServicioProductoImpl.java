package com.example.fidelidad.servicios.producto;

import com.example.fidelidad.dtos.catalogo.ProductoResponseDTO;
import com.example.fidelidad.modelos.Producto;
import com.example.fidelidad.repositorios.IProductoRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ServicioProductoImpl implements IServicioProducto {

    private final IProductoRepositorio repositorioProducto;

    public ServicioProductoImpl(IProductoRepositorio repositorioProducto) {
        this.repositorioProducto = repositorioProducto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> listar() {
        return repositorioProducto.findAllByOrderByNombreAsc().stream()
                .map(ProductoResponseDTO::from)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoResponseDTO buscarPorId(Long id) {
        Producto producto = repositorioProducto.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        return ProductoResponseDTO.from(producto);
    }
}