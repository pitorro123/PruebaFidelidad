import testimonios from "../../../../data/testimonios";
import TarjetaTestimonio from "./TarjetaTestimonio";
import styles from "./Testimonios.module.css";

function Testimonios() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Testimonios</h2>
            <div className={styles.grid}>
                {testimonios.map((testimonio) => (
                    <TarjetaTestimonio
                        key={testimonio.id}
                        nombre={testimonio.nombre}
                        calificacion={testimonio.calificacion}
                        descripcion={testimonio.descripcion}
                    />
                ))}
            </div>
        </section>
    );
}

export default Testimonios;