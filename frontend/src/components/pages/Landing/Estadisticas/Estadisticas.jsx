import styles from "./Estadisticas.module.css";
import estadisticas from "../../../../data/estadisticas";

function Estadisticas() {
    return (
        <section className={styles.estadisticas}>
            {estadisticas.map((item) => (
                <div key={item.id} className={styles.item}>
                    <span className={styles.value}>{item.valor}</span>
                    <span className={styles.label}>{item.etiqueta}</span>
                </div>
            ))}
        </section>
    );
}

export default Estadisticas;