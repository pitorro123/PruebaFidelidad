import { Link } from "react-router-dom"
import { metodosPago } from "../../../constants/metodosPago"
import { categoriasMock } from "../../../data/categoriasMock"
import Logo from "../Header/Logo/Logo"
import styles from "./Footer.module.css"
import { RUTAS } from "../../../constants/rutas"
import { zonaTruequesMock } from "../../../data/zonaTruequesMock"
import { legalMock } from "../../../data/legalMock"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contenedorNavegacionFooter}>
                <div className={styles.identidadFooter}>
                    <div className={styles.contenedorIdentidad}>
                        <Logo />
                        <span>Dale otra vuelta a tu estilo.</span>
                    </div>
                    <div className={styles.contenedorMetodosPago}>
                        <h3 className={styles.tituloSecundarioFooter}>Métodos de pago aceptados</h3>
                        <div className={styles.metodosPago}>
                            {metodosPago.map((metodo) => {
                                const Recurso = metodo.recurso
                                return (
                                    <div key={metodo.id}>
                                        {metodo.tipo === "icono" ? <Recurso className={styles.iconoMetodoPago} /> : <img className={styles.imagenMetodoPago} src={metodo.recurso} alt={metodo.nombre} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className={styles.titulosFooter}>Catálogo</h2>
                    <div className={styles.contenedoresFooter}>
                        {categoriasMock.map((categoria) => (
                            <Link to={`${RUTAS.CATALOGO}?busqueda=${categoria.nombre}`} key={categoria.id} className={styles.linksFooter}>
                                {categoria.nombre}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.contenedoresFooter}>
                    <h2 className={styles.titulosFooter}>Zona Trueques</h2>
                    {zonaTruequesMock.map((opcion) => (
                        opcion.tipo === "link"
                            ? <Link to={`${opcion.ruta}${opcion.hash}`} key={opcion.id} className={styles.linksFooter}>{opcion.nombre}</Link>
                            : <button type="button" key={opcion.id} className={styles.linksFooter}>{opcion.nombre}</button>
                    ))}
                </div>
                <div className={styles.contenedoresFooter}>
                    <h2 className={styles.titulosFooter}>Legal</h2>
                    {legalMock.map((opcion) => (
                        <Link to={opcion.ruta} key={opcion.id} className={styles.linksFooter}>
                            {opcion.nombre}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.contenedorDerechosReservados}>
                <span className={styles.derechosReservados}>© 2026 ReVuelta. Todos los derechos reservados.</span>
            </div>
        </footer>
    )
}

export default Footer