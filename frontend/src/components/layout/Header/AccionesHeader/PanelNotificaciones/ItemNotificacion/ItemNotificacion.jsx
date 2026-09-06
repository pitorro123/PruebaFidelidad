import { iconosNotificacion } from "./iconosNotificacion"
import styles from "./ItemNotificacion.module.css"

const ItemNotificacion = ({ referenciaVisual, descripcion }) => {
    const Icono = iconosNotificacion[referenciaVisual] || iconosNotificacion.default
    return (
        <div className={styles.itemNotificacion}>
            <span className={styles.contenedorIcono}>
                <Icono />
            </span>
            <p className={styles.descripcionNotificacion}>{descripcion}</p>
        </div>
    )
}

export default ItemNotificacion