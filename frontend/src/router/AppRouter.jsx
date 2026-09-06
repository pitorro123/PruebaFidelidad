import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import { RUTAS } from "../constants/rutas"
import AuthLayout from "../layouts/AuthLayout"
import Landing from "../pages/Landing"
import Catalogo from "../pages/catalogo/Catalogo"
import PaginaDetalleProducto from "../pages/PaginaDetalleProducto"
import InicioSesion from "../pages/InicioSesion"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={RUTAS.LANDING_PAGE} element={< Landing />}/>
                    <Route path={RUTAS.PERFIL} element={null}/>
                    <Route path={RUTAS.PEDIDOS} element={null}/>
                    <Route path={RUTAS.TRUEQUES} element={null}/>
                    <Route path={RUTAS.CAMPANAS_DESCUENTOS} element={null}/>
                    <Route path={RUTAS.CARRITO} element={null}/>
                    <Route path={RUTAS.PUBLICAR_PRENDA} element={null}/>
                    <Route path={RUTAS.CATALOGO} element={<Catalogo />}/>
                    <Route path={RUTAS.DETALLE_PRODUCTO} element={<PaginaDetalleProducto />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.REGISTRO} element={null}/>
                    <Route path={RUTAS.INICIAR_SESION} element={<InicioSesion />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter