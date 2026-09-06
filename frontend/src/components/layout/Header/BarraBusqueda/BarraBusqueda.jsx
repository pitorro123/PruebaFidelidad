import { Search, Star, UserRound } from "lucide-react"
import styles from "./BarraBusqueda.module.css"
import { useEffect, useRef, useState } from "react"
import { buscarPrendas, buscarVendedores } from "../../../../services/busquedaServicio"
import { Link, useNavigate } from "react-router-dom"
import { RUTAS } from "../../../../constants/rutas"

const BarraBusqueda = () => {
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [resultadosPrendas, setResultadosPrendas] = useState(null);
    const [resultadosVendedores, setResultadosVendedores] = useState(null);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const navigate = useNavigate();
    const contenedorBuscador = useRef(null);
    const manejarBusqueda = (e) => {
        e.preventDefault();
        if (terminoBusqueda.trim() === "") {
            return
        }
        navigate(`${RUTAS.CATALOGO}?busqueda=${terminoBusqueda.trim()}`)

        limpiarBusqueda();
    }
    const manejarCambioBusqueda = (e) => {
        const valorBusqueda = e.target.value

        setTerminoBusqueda(valorBusqueda)

        setMostrarSugerencias(valorBusqueda.trim() !== "")

        setResultadosPrendas(
            valorBusqueda.trim() === ""
                ? null
                : buscarPrendas(valorBusqueda)
        )

        setResultadosVendedores(
            valorBusqueda.trim() === ""
                ? null
                : buscarVendedores(valorBusqueda)
        )
    }
    function manejarClickFuera(event) {
        if (
            contenedorBuscador.current &&
            !contenedorBuscador.current.contains(event.target)
        ) {
            setMostrarSugerencias(false)
        }
    }
    function mostrarSugerenciasAlEnfocar() {
        if (terminoBusqueda.trim() !== "") {
            setMostrarSugerencias(true)
        }
    }
    function limpiarBusqueda() {
        setTerminoBusqueda("")
        setResultadosPrendas(null)
        setResultadosVendedores(null)
        setMostrarSugerencias(false)
    }
    useEffect(() => {
        document.addEventListener("mousedown", manejarClickFuera)

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera)
        }
    }, [])
    return (
        <div className={styles.buscador} ref={contenedorBuscador}>
            <form className={styles.contenedorBusqueda} onSubmit={manejarBusqueda}>
                <button type="submit" className={styles.contenedorIconoBusqueda}>
                    <Search className={styles.iconoBusqueda} />
                </button>
                <input className={styles.campoBusqueda} type="text" placeholder="Buscar prendas, vendedores..." value={terminoBusqueda} onChange={manejarCambioBusqueda} onFocus={mostrarSugerenciasAlEnfocar} />
            </form>
            {terminoBusqueda.trim() !== "" && mostrarSugerencias && (
                <div className={styles.resultadosBusqueda}>
                    <Link to={`${RUTAS.CATALOGO}?busqueda=${terminoBusqueda.trim()}`} className={styles.resultadoBusqueda} onClick={limpiarBusqueda}>
                        <Search className={styles.iconoBusqueda2} />
                        <p className={styles.tituloResultado}>{terminoBusqueda.trim()}</p>
                    </Link>
                    {resultadosPrendas !== null && resultadosPrendas.length > 0 && (
                        <div>
                            {resultadosPrendas.map((titulo) => (
                                <Link key={titulo} to={`${RUTAS.CATALOGO}?busqueda=${titulo}`} className={styles.resultadoBusqueda} onClick={limpiarBusqueda}>
                                    <Search className={styles.iconoBusqueda2} />
                                    <p className={styles.tituloResultado}>{titulo}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                    {resultadosVendedores !== null && resultadosVendedores.length > 0 && (
                        <div>
                            {resultadosVendedores.map((vendedor) => (
                                <Link key={vendedor.idVendedor} to={`${RUTAS.CATALOGO}?vendedor=${vendedor.idVendedor}`} className={styles.resultadoBusqueda} onClick={limpiarBusqueda}>
                                    <div className={styles.informacionVendedor}>
                                        <UserRound className={styles.iconoBusqueda2} />
                                        <p className={styles.tituloResultado}>{vendedor.nombreVendedor}</p>
                                    </div>
                                    <div className={styles.calificacionVendedor}>
                                        <Star className={styles.iconoBusqueda2} />
                                        <p className={styles.tituloResultado}>{vendedor.calificacionVendedor}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {mostrarSugerencias && (
                <div
                    className={styles.fondoBusqueda}
                    onClick={() => setMostrarSugerencias(false)}
                ></div>
            )}
        </div>
    )
}

export default BarraBusqueda