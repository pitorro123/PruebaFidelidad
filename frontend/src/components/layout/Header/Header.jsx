import Logo from "./Logo/Logo"
import BarraBusqueda from "./BarraBusqueda/BarraBusqueda"
import AccionesHeader from "./AccionesHeader/AccionesHeader"
import styles from "./Header.module.css"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.contenedorLogoHeader}>
                <Logo />
            </div>

            <div className={styles.contenedorBuscadorHeader}>
                <BarraBusqueda />
            </div>

            <div className={styles.contenedorAccionesHeader}>
                <AccionesHeader />
            </div>
        </header>
    )
}

export default Header