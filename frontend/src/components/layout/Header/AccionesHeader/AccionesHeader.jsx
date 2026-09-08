import { Bell, Coins, UserRound } from "lucide-react"
import styles from "./AccionesHeader.module.css"
import PanelIdentificacion from "./PanelIdentificacion/PanelIdentificacion"
import PanelNotificaciones from "./PanelNotificaciones/PanelNotificaciones"
import PanelPerfil from "./PanelPerfil/PanelPerfil"
import PuntosModal from "../../../modals/PuntosModal/PuntosModal"
import { obtenerNotificaciones, suscribirseNotificaciones } from "../../../../services/notificacionesService"
import { useEffect, useRef, useState, useSyncExternalStore, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { RUTAS } from "../../../../constants/rutas"
import { useAuth } from "../../../../hooks/useAuth"

const AccionesHeader = () => {
    const { autenticado, usuario, cerrarSesion: cerrarSesionContexto } = useAuth()
    const navigate = useNavigate()
    const [panelActivo, setPanelActivo] = useState(null)
    const [puntosAbierto, setPuntosAbierto] = useState(false)

    const estaAutenticado = autenticado
    const notificaciones = useSyncExternalStore(suscribirseNotificaciones, obtenerNotificaciones)
    const contenedorAcciones = useRef(null)

    function alternarMenuPerfil() {
        setPanelActivo(
            panelActivo === "perfil" ? null : "perfil"
        )
    }

    function alternarNotificaciones() {
        setPanelActivo(
            panelActivo === "notificaciones" ? null : "notificaciones"
        )
    }

    const manejarClickFuera = useCallback((event) => {
        if (
            panelActivo !== null &&
            contenedorAcciones.current &&
            !contenedorAcciones.current.contains(event.target)
        ) {
            setPanelActivo(null)
        }
    }, [panelActivo])

    function cerrarSesion() {
        cerrarSesionContexto()

        setPanelActivo(null)

        navigate(RUTAS.LANDING_PAGE)
    }

    function abrirPuntos() {
        if (!estaAutenticado) {
            setPanelActivo("identificacion")
            return;
        }
        setPanelActivo(null)
        setPuntosAbierto(true)
    }

    useEffect(() => {
        document.addEventListener("mousedown", manejarClickFuera)

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera)
        }
    }, [manejarClickFuera])

    return (
        <>
            <div className={styles.accionesHeader} ref={contenedorAcciones}>
                <button
                    className={`${styles.botonIcono} ${panelActivo === "notificaciones"
                        ? styles.botonIconoActivo
                        : ""
                        }`}
                    onClick={alternarNotificaciones}>
                    <Bell />

                    {estaAutenticado && notificaciones.length > 0 && (
                        <span className={styles.indicadorNotificacion}></span>
                    )}
                </button>

                <button
                    className={`${styles.botonIcono} ${!estaAutenticado && panelActivo === "identificacion"
                        ? styles.botonIconoActivo
                        : ""
                        }`}
                    onClick={abrirPuntos}
                    title="Mis puntos SUMAS"
                    aria-label="Mis puntos SUMAS">
                    <Coins />
                </button>

                <button
                    className={`${styles.botonIcono} ${panelActivo === "perfil"
                        ? styles.botonIconoActivo
                        : ""
                        }`}
                    onClick={alternarMenuPerfil}>
                    <UserRound />
                </button>

                {estaAutenticado && panelActivo === "perfil" && (
                    <PanelPerfil
                        usuario={usuario}
                        cerrarSesion={cerrarSesion}
                        onVerPuntos={abrirPuntos} />
                )}

                {estaAutenticado && panelActivo === "notificaciones" && (
                    <PanelNotificaciones
                        notificaciones={notificaciones} />
                )}

                {!estaAutenticado && panelActivo !== null && (
                    <PanelIdentificacion />
                )}
            </div>

            {estaAutenticado && (
                panelActivo === "perfil" ||
                panelActivo === "notificaciones"
            ) && (
                    <div className={styles.fondoPanel}></div>
                )}

            <PuntosModal
                estaAbierto={puntosAbierto}
                onCerrar={() => setPuntosAbierto(false)} />
        </>
    )
}

export default AccionesHeader