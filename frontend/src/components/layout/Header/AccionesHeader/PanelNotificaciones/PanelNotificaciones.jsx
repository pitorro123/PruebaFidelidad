import ItemNotificacion from "./ItemNotificacion/ItemNotificacion"
import { useRef, useState } from "react"
import styles from "./PanelNotificaciones.module.css"

const PanelNotificaciones = ({ notificaciones }) => {

    const [scrollActivo, setScrollActivo] = useState(false)
    const temporizadorScroll = useRef(null)

    const manejarScroll = () => {
        setScrollActivo(true)

        clearTimeout(temporizadorScroll.current)

        temporizadorScroll.current = setTimeout(() => {
            setScrollActivo(false)
        }, 500)
    }

    return (
        <div className={`${styles.PanelNotificaciones} ${scrollActivo ? styles.scrollActivo : ""}`}
    onScroll={manejarScroll}>
            {notificaciones.length === 0 ? (
                <p>No  tienes notificaciones</p>
            ) : (
                notificaciones.map((notificacion) => (
                    <ItemNotificacion
                        key={notificacion.id}
                        referenciaVisual={notificacion.referenciaVisual}
                        descripcion={notificacion.descripcion}
                    />
                ))
            )
            }
        </div>
    )
}


export default PanelNotificaciones