import styles from "./Testimonios.module.css";

function TarjetaTestimonio({ nombre, calificacion, descripcion }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.avatar}>{nombre.charAt(0)}</div>
                <span className={styles.name}>{nombre}</span>
            </div>

            <div className={styles.rating} aria-label={`Calificación: ${calificacion} de 5 estrellas`}>
                {"★".repeat(calificacion)}
                {"☆".repeat(5 - calificacion)}
            </div>

            <p className={styles.description}>{descripcion}</p>
        </div>
    );
}

export default TarjetaTestimonio;