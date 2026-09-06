import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../constants/rutas"
import { useAuth } from "../hooks/useAuth";
import Hero from "../components/pages/Landing/Hero/Hero";
import ProductosDestacados from "../components/pages/Landing/ProductosDestacados/ProductosDestacados";
import MarcasDestacadas from "../components/pages/Landing/MarcasDestacadas/MarcasDestacadas";
import ProductModal from "../components/modals/ProductModal/ProductModal";
import FidelidadModal from "../components/modals/FidelidadModal/FidelidadModal";
import styles from "./Landing.module.css";

const CLAVE_MODAL_FIDELIDAD_VISTO = 'revuelta_modal_fidelidad_visto';

function Home() {
    const navigate = useNavigate();
    const { autenticado } = useAuth();
    const heroImg = "https://res.cloudinary.com/ihe8jaok/image/upload/v1788192323/landing_img.jpg"
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalFidelidadAbierto, setModalFidelidadAbierto] = useState(false);
    const [claveFidelidad, setClaveFidelidad] = useState(0);

    useEffect(() => {
        if (!autenticado) {
            sessionStorage.removeItem(CLAVE_MODAL_FIDELIDAD_VISTO);
            return;
        }
        const yaVisto = sessionStorage.getItem(CLAVE_MODAL_FIDELIDAD_VISTO) === 'true';
        if (!yaVisto) {
            const temporizador = setTimeout(() => {
                setModalFidelidadAbierto(true);
                setClaveFidelidad((c) => c + 1);
                sessionStorage.setItem(CLAVE_MODAL_FIDELIDAD_VISTO, 'true');
            }, 0);
            return () => clearTimeout(temporizador);
        }
    }, [autenticado]);

    const abrirModalFidelidad = () => {
        if (!autenticado) {
            navigate(RUTAS.INICIAR_SESION);
            return;
        }
        setModalFidelidadAbierto(true);
        setClaveFidelidad((c) => c + 1);
    };

    const handleExplorarCatalogo = () => {
        navigate(RUTAS.CATALOGO);
    };

    const abrirModalProducto = (producto) => {
        setProductoSeleccionado(producto);
        setModalAbierto(true);
    };

    const handleVerProducto = (producto) => {
        abrirModalProducto(producto);
    };

    const handleAgregarCarrito = (producto) => {
        abrirModalProducto(producto);
    };

    const handleTrueque = (producto) => {
        abrirModalProducto(producto);
    };

    const handleVerCatalogo = () => {
        setModalAbierto(false);
        navigate(RUTAS.CATALOGO);
    };

    return (
        <>
            <Hero
                titulo="Dale una segunda vida a tu ropa"
                descripcion="Compra, vende y truequea prendas en un solo lugar."
                imagenSrc={heroImg}
                onExplorarCatalogo={handleExplorarCatalogo}
            />
            <MarcasDestacadas />
            <section className={styles.ctaFidelidad}>
                <p className={styles.ctaBadge}>Programa de fidelidad</p>
                <h2 className={styles.ctaTitulo}>Ahorra 20% en tu primera compra</h2>
                <p className={styles.ctaDescripcion}>
                    Descubre nuestro mundo circular de moda sostenible. Disfruta de descuentos exclusivos, trueques
                    de prendas y ofertas especiales de todas las marcas del grupo.
                </p>
                <button
                    type="button"
                    className={styles.ctaBoton}
                    onClick={abrirModalFidelidad}
                >
                    Quiero mi 20% de descuento
                </button>
            </section>
            <ProductosDestacados
                onVerProducto={handleVerProducto}
                onAgregarCarrito={handleAgregarCarrito}
                onTrueque={handleTrueque}
            />
            <ProductModal
                producto={productoSeleccionado}
                estaAbierto={modalAbierto && !!productoSeleccionado}
                onCerrar={() => setModalAbierto(false)}
                onProponerTrueque={handleVerCatalogo}
                onVerCatalogo={handleVerCatalogo}
            />
            <FidelidadModal
                key={claveFidelidad}
                estaAbierto={modalFidelidadAbierto}
                onCerrar={() => setModalFidelidadAbierto(false)}
            />
        </>
    );
}

export default Home;