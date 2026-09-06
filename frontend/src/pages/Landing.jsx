import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../constants/rutas"
import Hero from "../components/pages/Landing/Hero/Hero";
import CategoriasDestacadas from "../components/pages/Landing/CategoriasDestacadas/CategoriasDestacadas";
import Estadisticas from "../components/pages/Landing/Estadisticas/Estadisticas";
import ProductosDestacados from "../components/pages/Landing/ProductosDestacados/ProductosDestacados";
import ComoFunciona from "../components/pages/Landing/ComoFunciona/ComoFunciona";
import MarcasDestacadas from "../components/pages/Landing/MarcasDestacadas/MarcasDestacadas";
import Testimonios from "../components/pages/Landing/Testimonios/Testimonios";
import ProductModal from "../components/modals/ProductModal/ProductModal";

function Home() {
    const navigate = useNavigate();
    const heroImg = "https://res.cloudinary.com/ihe8jaok/image/upload/v1788192323/landing_img.jpg"
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const handleExplorarCatalogo = () => {
        navigate(RUTAS.CATALOGO);
    };

    const handleSeleccionarCategoria = () => {
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
            <Estadisticas />
            <CategoriasDestacadas onSeleccionarCategoria={handleSeleccionarCategoria} />
            <ProductosDestacados
                onVerProducto={handleVerProducto}
                onAgregarCarrito={handleAgregarCarrito}
                onTrueque={handleTrueque}
            />
            < ComoFunciona />
            < MarcasDestacadas />
            < Testimonios />

            <ProductModal
                producto={productoSeleccionado}
                estaAbierto={modalAbierto && !!productoSeleccionado}
                onCerrar={() => setModalAbierto(false)}
                onProponerTrueque={handleVerCatalogo}
                onVerCatalogo={handleVerCatalogo}
            />
        </>
    );
}

export default Home;