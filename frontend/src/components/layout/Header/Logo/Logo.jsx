import { Link } from "react-router-dom"
import styles from "./Logo.module.css"
import { RUTAS } from "../../../../constants/rutas"

const Logo = () => {
    return (
        <Link to={RUTAS.LANDING_PAGE} className={styles.logo}>
            ReVuelta
        </Link>
    )
}

export default Logo