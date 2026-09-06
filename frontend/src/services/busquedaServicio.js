import { productos } from "../data/catalogoProductos";
import { mapearProductoLocal } from "./productosService";

export function buscarPrendas(terminoBusqueda) {
    const termino = terminoBusqueda.trim().toLowerCase();
    return productos
        .map((p) => p.nombre)
        .filter((titulo) => titulo.toLowerCase().includes(termino))
        .slice(0, 6);
}

export function buscarVendedores(terminoBusqueda) {
    const termino = terminoBusqueda.trim().toLowerCase();
    const vistos = new Set();
    return productos
        .map(mapearProductoLocal)
        .map((p) => ({
            idVendedor: p.id,
            nombreVendedor: p.vendedor,
            calificacionVendedor: p.calificacion,
        }))
        .filter((vendedor) => {
            if (!vendedor.nombreVendedor.toLowerCase().includes(termino)) return false;
            if (vistos.has(vendedor.nombreVendedor)) return false;
            vistos.add(vendedor.nombreVendedor);
            return true;
        });
}