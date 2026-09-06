import styles from "./CategoriasDestacadas.module.css";

function CategoriaCard({ nombre, imagen, contador, onSeleccionar }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSeleccionar(nombre);
        }
    };

    return (
        <div 
            className={styles.card} 
            onClick={() => onSeleccionar(nombre)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className={styles.imageWrapper}>
                {imagen ? (
                    <img src={imagen} alt={nombre} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                            <circle cx="9" cy="9" r="2"/>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                        </svg>
                    </div>
                )}
            </div>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <span className={styles.name}>{nombre}</span>
                    <span className={styles.count}>{contador} prendas</span>
                </div>
                <div className={styles.arrowBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default CategoriaCard;