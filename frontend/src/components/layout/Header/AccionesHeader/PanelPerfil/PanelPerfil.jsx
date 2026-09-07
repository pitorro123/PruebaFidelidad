import { LogOut, UserRound } from "lucide-react"
import styles from "./PanelPerfil.module.css"
import OpcionMenuPerfil from "../OpcionMenuPerfil/OpcionMenuPerfil"

const PanelPerfil = ({ usuario, cerrarSesion }) => {
    return (
        <div className={styles.menuPerfil}>
            <div className={styles.datosPerfil}>
                <div className={styles.usuarioPerfil}>
                    <div className={styles.contenedorFotoPerfil}>
                        <UserRound />
                    </div>

                    <p className={styles.nombreUsuario}>
                        {usuario?.correo || "Nombre Usuario"}
                    </p>
                </div>
            </div>

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