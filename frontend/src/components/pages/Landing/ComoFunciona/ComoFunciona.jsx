import comoFunciona from "../../../../data/comoFunciona";
import PasoFuncionamiento from "./PasoFuncionamiento";
import styles from "../ComoFunciona/ComoFunciona.module.css";

function ComoFunciona() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Cómo Funciona</h2>
            <div className={styles.grid}>
                {comoFunciona.map((paso, index) => (
                    <PasoFuncionamiento
                        key={paso.id}
                        numero={index + 1}
                        titulo={paso.titulo}
                        descripcion={paso.descripcion}
                    />
                ))}
            </div>
        </section>
    );
}

export default ComoFunciona;