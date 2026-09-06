import { NavLink } from "react-router-dom"
import styles from "./PanelIdentificacion.module.css"
import { RUTAS } from "../../../../../constants/rutas"

const PanelIdentificacion = () => {
    return (
        <div className={styles.panelIdentificacion}>
            <p className={styles.mensajeIdentificacion}>
                Accede a tu cuenta
            </p>
            <div className={styles.accionesIdentificacion}>
                <NavLink to={RUTAS.INICIAR_SESION} className={styles.botonIniciarSesion}>
                    Iniciar sesión
                </NavLink>
                <NavLink to={RUTAS.REGISTRO} className={styles.botonRegistro}>
                    Registrate
                </NavLink>
            </div>
        </div>

    )
}

export default PanelIdentificacion