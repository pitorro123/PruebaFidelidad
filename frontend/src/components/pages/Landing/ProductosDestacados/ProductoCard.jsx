import styles from "../ProductosDestacados/ProductosDestacados.module.css";

function ProductoCard({
    nombre,
    marca,
    imagen,
    talla,
    calificacion,
    precio,
    onVerProducto,
    onAgregarCarrito,
    onTrueque,
}) {
    return (
        <div className={styles.card}>
            <button className={styles.imageButton} onClick={onVerProducto}>
                <img src={imagen} alt={nombre} className={styles.image} />
            </button>

            <div className={styles.info}>
                <span className={styles.brand}>{marca}</span>
                <h3 className={styles.name}>{nombre}</h3>
                <span className={styles.size}>Talla: {talla}</span>
                <span className={styles.rating}>★ {calificacion.toFixed(1)}</span>
            </div>

            <div className={styles.footer}>
                <span className={styles.price}>${precio.toLocaleString("es-CO")}</span>

                <div className={styles.actions}>
                    <button
                        className={styles.cartButton}
                        onClick={onAgregarCarrito}
                        aria-label="Agregar al carrito"
                    >
                        🛒
                    </button>
                    <button className={styles.tradeButton} onClick={onTrueque}>
                        Ver mas +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductoCard;