import { ArrowLeftRight, PackageOpen, Tag, UserRound } from "lucide-react";
import { RUTAS } from "../../../../../constants/rutas";

const opcionesMenuPerfil = [
    {id: "perfil", texto: "Mi Perfil", Icono: UserRound, ruta: RUTAS.PERFIL},
    {id: "pedidos", texto: "Mis Pedidos",Icono: PackageOpen, ruta: RUTAS.PEDIDOS},
    {id: "trueques", texto: "Mis Trueques", Icono: ArrowLeftRight, ruta: RUTAS.TRUEQUES},
    {id: "campañas", texto: "Campañas y Descuentos", Icono: Tag, ruta: RUTAS.CAMPANAS_DESCUENTOS},
];

export default opcionesMenuPerfil