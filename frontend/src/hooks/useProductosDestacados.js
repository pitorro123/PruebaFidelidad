import { useState } from "react";
import { productos as productosCatalogo } from "../data/catalogoProductos";
import { mapearProductoLocal } from "../services/productosService";
import { mezclarArray } from "../utils/aleatorio";

const CANTIDAD_A_MOSTRAR = 3;

function useProductosDestacados() {
    const [productos] = useState(() =>
        mezclarArray(productosCatalogo.map(mapearProductoLocal)).slice(0, CANTIDAD_A_MOSTRAR),
    );
    return { productos };
}

export default useProductosDestacados;