import { LogOut, UserRound } from "lucide-react"
import styles from "./PanelPerfil.module.css"
import opcionesMenuPerfil from "../OpcionMenuPerfil/opcionesMenuPerfil"
import OpcionMenuPerfil from "../OpcionMenuPerfil/OpcionMenuPerfil"

const PanelPerfil = ({ cerrarPanelActivo, cerrarSesion }) => {
    return (
        <div className={styles.menuPerfil}>
            <div className={styles.datosPerfil}>
                <div className={styles.usuarioPerfil}>
                    <div className={styles.contenedorFotoPerfil}>
                        <UserRound />
                    </div>

                    <p className={styles.nombreUsuario}>
                        Nombre Usuario
                    </p>
                </div>

                <span className={styles.puntosUsuario}>
                    0 pts
                </span>
            </div>

            {opcionesMenuPerfil.map((opcion) => (
                <OpcionMenuPerfil
                    key={opcion.id}
                    Icono={opcion.Icono}
                    texto={opcion.texto}
                    ruta={opcion.ruta}
                    onClick={cerrarPanelActivo}
                />
            ))}

            <div className={styles.contenedorCerrarSesion}>
                <OpcionMenuPerfil
                    Icono={LogOut}
                    texto="Cerrar Sesión"
                    onClick={cerrarSesion}
                />
            </div>
        </div>
    )
}

export default PanelPerfil