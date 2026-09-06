import marcas from "../../../../data/marcas";
import LogoMarca from "./LogoMarca";
import styles from "../MarcasDestacadas/MarcasDestacadas.module.css";

const marcasRepetidas = [...marcas, ...marcas, ...marcas, ...marcas];

function MarcasDestacadas() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Marcas Destacadas</h2>

            <div className={styles.carousel}>
                <div className={styles.track}>
                    {marcasRepetidas.map((marca, index) => (
                        <LogoMarca key={`${marca.id}-${index}`} nombre={marca.nombre} logo={marca.logo} />
                    ))}
                    {marcasRepetidas.map((marca, index) => (
                        <LogoMarca key={`duplicado-${marca.id}-${index}`} nombre={marca.nombre} logo={marca.logo} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MarcasDestacadas;