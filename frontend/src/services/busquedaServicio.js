import { prendasBusquedaMock } from "../data/prendasBusquedaMock";

export function buscarPrendas(terminoBusqueda) {
    const termino = terminoBusqueda.trim().toLowerCase();
    const resultado = [];

    prendasBusquedaMock.forEach((prenda) => {
        const titulo = prenda.titulo.toLowerCase();
        const tituloExiste = resultado.some((tituloGuardado) => {
            return tituloGuardado.toLowerCase() === titulo
        })

        if (titulo.includes(termino) && !tituloExiste) {
            resultado.push(prenda.titulo);
        }
    })
    return resultado;
}

export function buscarVendedores(terminoBusqueda) {
    const termino = terminoBusqueda.trim().toLowerCase();
    const resultado = [];

    prendasBusquedaMock.forEach((vendedor) => {
        const nombreVendedor = vendedor.nombreVendedor.toLowerCase();
        const vendedorExiste = resultado.some((vendedorGuardado) => {
            return vendedorGuardado.idVendedor === vendedor.idVendedor
        })

        if (nombreVendedor.includes(termino) && !vendedorExiste) {
            resultado.push({
                idVendedor: vendedor.idVendedor,
                nombreVendedor: vendedor.nombreVendedor,
                calificacionVendedor: vendedor.calificacionVendedor
            });
        }
    })
    return resultado;
}