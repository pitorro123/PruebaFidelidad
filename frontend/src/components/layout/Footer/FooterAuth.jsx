import { Link } from "react-router-dom"
import { legalMock } from "../../../data/legalMock"
import styles from "./FooterAuth.module.css"

const FooterAuth = () => {
    return (
        <footer className={styles.footer}>
            <span className={styles.derechosReservados}>© 2026 ReVuelta</span>
            <div className={styles.contenedorRutas}>
                {legalMock.slice(0, 3).map((opcion) => (
                    <Link to={opcion.ruta} key={opcion.id} className={styles.linksFooter}>
                        {opcion.nombreCorto}
                    </Link>
                ))}
            </div>
        </footer>
    )
}

export default FooterAuth