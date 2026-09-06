import useProductosDestacados from "../../../../hooks/useProductosDestacados";
import ProductoCard from "./ProductoCard";
import styles from "../ProductosDestacados/ProductosDestacados.module.css";

function ProductosDestacados({ onVerProducto, onAgregarCarrito, onTrueque }) {
    const { productos } = useProductosDestacados();
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Productos Destacados</h2>
            <div className={styles.grid}>
                {productos.map((producto) => (
                    <ProductoCard
                        key={producto.id}
                        nombre={producto.nombre}
                        marca={producto.marca}
                        imagen={producto.imagen}
                        talla={producto.talla}
                        calificacion={producto.calificacion}
                        precio={producto.precio}
                        onVerProducto={() => onVerProducto(producto)}
                        onAgregarCarrito={() => onAgregarCarrito(producto)}
                        onTrueque={() => onTrueque(producto)}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductosDestacados;