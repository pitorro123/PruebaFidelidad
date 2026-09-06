import { Bell, Plus, UserRound } from "lucide-react"
import styles from "./AccionesHeader.module.css"
import PanelIdentificacion from "./PanelIdentificacion/PanelIdentificacion"
import PanelNotificaciones from "./PanelNotificaciones/PanelNotificaciones"
import PanelPerfil from "./PanelPerfil/PanelPerfil"
import { obtenerNotificaciones, suscribirseNotificaciones } from "../../../../services/notificacionesService"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { RUTAS } from "../../../../constants/rutas"
import { useAuth } from "../../../../hooks/useAuth"

const AccionesHeader = () => {
    const { autenticado, iniciarSesion, cerrarSesion: cerrarSesionContexto } = useAuth()
    const navigate = useNavigate()
    const [panelActivo, setPanelActivo] = useState(null)
    const [publicarMovilAbierto, setPublicarMovilAbierto] = useState(false)

    const estaAutenticado = autenticado
    const notificaciones = useSyncExternalStore(suscribirseNotificaciones, obtenerNotificaciones)
    const contenedorAcciones = useRef(null)

    function alternarMenuPerfil() {
        setPublicarMovilAbierto(false)

        setPanelActivo(
            panelActivo === "perfil" ? null : "perfil"
        )
    }

    function alternarNotificaciones() {
        setPublicarMovilAbierto(false)

        setPanelActivo(
            panelActivo === "notificaciones" ? null : "notificaciones"
        )
    }

    function alternarPublicarMovil() {
        setPanelActivo(null)
        setPublicarMovilAbierto(!publicarMovilAbierto)
    }

    function abrirIdentificacionPublicar() {
        setPublicarMovilAbierto(false)
        setPanelActivo("publicar")
    }

    function manejarClickFuera(event) {
        if (
            panelActivo !== null &&
            contenedorAcciones.current &&
            !contenedorAcciones.current.contains(event.target)
        ) {
            setPanelActivo(null)
        }

        if (
            publicarMovilAbierto &&
            contenedorAcciones.current &&
            !contenedorAcciones.current.contains(event.target)
        ) {
            setPublicarMovilAbierto(false)
        }
    }

    function cerrarSesion() {
        cerrarSesionContexto()

        setPanelActivo(null)
        setPublicarMovilAbierto(false)

        navigate(RUTAS.LANDING_PAGE)
    }

    function activarSesionPrueba() {
        iniciarSesion({ correo: "usuario@ejemplo.com", contrasena: "password123" })
        setPanelActivo(null)
    }

    const cerrarPanelActivo = () => {
        setPanelActivo(null)
        setPublicarMovilAbierto(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", manejarClickFuera)

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera)
        }
    }, [panelActivo, publicarMovilAbierto])

    return (
        <>
            <div className={styles.accionesHeader} ref={contenedorAcciones}>
                {import.meta.env.DEV && (
                    <button
                        type="button"
                        className={styles.botonSesionPrueba}
                        onClick={activarSesionPrueba}>
                    </button>
                )}
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
                    className={`${styles.botonIcono} ${panelActivo === "perfil"
                        ? styles.botonIconoActivo
                        : ""
                        }`}
                    onClick={alternarMenuPerfil}>
                    <UserRound />
                </button>

                {estaAutenticado ? (
                    <NavLink
                        to={RUTAS.PUBLICAR_PRENDA}
                        className={styles.botonPublicar}
                        onClick={cerrarPanelActivo}>
                        <Plus className={styles.iconoBotonPublicar} />
                        Publicar prenda
                    </NavLink>
                ) : (
                    <button
                        className={styles.botonPublicar}
                        onClick={abrirIdentificacionPublicar}>
                        <Plus className={styles.iconoBotonPublicar} />
                        Publicar prenda
                    </button>
                )}

                <div className={styles.publicarFlotante}>
                    {publicarMovilAbierto && (
                        estaAutenticado ? (
                            <NavLink
                                to={RUTAS.PUBLICAR_PRENDA}
                                className={styles.accionPublicarMovil}
                                onClick={cerrarPanelActivo}>
                                <Plus className={styles.iconoBotonPublicar} />
                                Publicar prenda
                            </NavLink>
                        ) : (
                            <button
                                type="button"
                                className={styles.accionPublicarMovil}
                                onClick={abrirIdentificacionPublicar}>
                                <Plus className={styles.iconoBotonPublicar} />
                                Publicar prenda
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        className={`${styles.botonPublicarFlotante} ${publicarMovilAbierto
                            ? styles.botonPublicarFlotanteAbierto
                            : ""
                            }`}
                        onClick={alternarPublicarMovil}>
                        <Plus />
                    </button>
                </div>

                {estaAutenticado && panelActivo === "perfil" && (
                    <PanelPerfil
                        cerrarPanelActivo={cerrarPanelActivo}
                        cerrarSesion={cerrarSesion} />
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
        </>
    )
}

export default AccionesHeader