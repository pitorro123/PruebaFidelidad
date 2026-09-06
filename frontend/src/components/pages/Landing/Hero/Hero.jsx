import styles from "./Hero.module.css";

function Hero({ titulo, descripcion, imagenSrc, onExplorarCatalogo }) {
    return (
        <section
            className={styles.hero}
            style={imagenSrc ? { backgroundImage: `url(${imagenSrc})` } : undefined}
        >
            <div className={styles.overlay} />

            <div className={styles.content}>
                <h1 className={styles.title}>{titulo}</h1>
                <p className={styles.description}>{descripcion}</p>
                <button className={styles.button} onClick={onExplorarCatalogo}>
                    Explorar Catálogo
                </button>
            </div>
        </section>
    );
}

export default Hero;