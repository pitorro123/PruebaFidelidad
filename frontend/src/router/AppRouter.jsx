import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import { RUTAS } from "../constants/rutas"
import AuthLayout from "../layouts/AuthLayout"
import Landing from "../pages/Landing/Landing"
import Catalogo from "../pages/catalogo/Catalogo/Catalogo"
import PaginaDetalleProducto from "../pages/PaginaDetalleProducto/PaginaDetalleProducto"
import InicioSesion from "../pages/InicioSesion/InicioSesion"
import Registro from "../pages/Registro/Registro"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={RUTAS.LANDING_PAGE} element={< Landing />}/>
                    <Route path={RUTAS.CATALOGO} element={<Catalogo />}/>
                    <Route path={RUTAS.DETALLE_PRODUCTO} element={<PaginaDetalleProducto />}/>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={RUTAS.REGISTRO} element={<Registro />}/>
                    <Route path={RUTAS.INICIAR_SESION} element={<InicioSesion />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter