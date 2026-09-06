import CategoriaCard from "./CategoriaCard";
import styles from "./CategoriasDestacadas.module.css";
import categoriasDestacadas from "../../../../data/categoriasDestacadas";

function CategoriasDestacadas({ onSeleccionarCategoria }) {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categorías Destacadas</h2>
            <div className={styles.grid}>
                {categoriasDestacadas.map((categoria) => (
                    <CategoriaCard
                        key={categoria.id}
                        nombre={categoria.nombre}
                        imagen={categoria.imagen}
                        contador={categoria.contador}
                        onSeleccionar={() => onSeleccionarCategoria(categoria.nombre)}
                    />
                ))}
            </div>
        </section>
    );
}

export default CategoriasDestacadas;