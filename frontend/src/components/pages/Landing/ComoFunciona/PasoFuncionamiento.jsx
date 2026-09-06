import styles from "../ComoFunciona/ComoFunciona.module.css";

function PasoFuncionamiento({ numero, titulo, descripcion }) {
    return (
        <div className={styles.card}>
            <span className={styles.number}>{numero}</span>
            <h3 className={styles.title}>{titulo}</h3>
            <p className={styles.description}>{descripcion}</p>
        </div>
    );
}

export default PasoFuncionamiento;