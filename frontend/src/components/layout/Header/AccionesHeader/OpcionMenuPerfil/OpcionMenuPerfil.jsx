import styles from "./OpcionMenuPerfil.module.css"
import { NavLink } from "react-router-dom";

const OpcionMenuPerfil = ({ texto, Icono, ruta, onClick }) => {

    const contenidoOpcion = (
        <>
            <span className={styles.contenedorIcono}>
                <Icono />
            </span>
            <span className={styles.textoMenu}>{texto}</span>
        </>
    );

    return (
        ruta ? (
            <NavLink to={ruta} className={styles.opcionMenu} onClick={onClick}>
                {contenidoOpcion}
            </NavLink>
        ) : (
            <button className={styles.opcionMenu} onClick={onClick}>
                {contenidoOpcion}
            </button>
        )
    )
}

export default OpcionMenuPerfil