import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import pse from "../assets/imagenes/metodos-pago/pse.svg"
import { RUTAS } from "../constants/rutas";

export const metodosPago = [
    { id: 1, nombre: "Mastercard", recurso: FaCcMastercard, tipo: "icono" },
    { id: 2, nombre: "VISA", recurso: FaCcVisa, tipo: "icono" },
    { id: 3, nombre: "PSE", recurso: pse, tipo: "imagen" },
]

export const categoriasFooter = [
    { id: 1, nombre: "Camisas" },
    { id: 2, nombre: "Pantalones" },
    { id: 3, nombre: "Chaquetas" },
    { id: 4, nombre: "Zapatos" }
]

export const zonaTruequesFooter = [
    { id: 1, nombre: "Propón Trueque", ruta: RUTAS.CATALOGO, hash: "", tipo: "link" },
    { id: 2, nombre: "Puntos de Acopio", ruta: null, hash: "", tipo: "modal" },
]

export const legalFooter = [
    { id: 1, nombre: "Terminos y Condiciones", nombreCorto: "Terminos", ruta: "#" },
    { id: 2, nombre: "Política de Privacidad", nombreCorto: "Privacidad", ruta: "#" },
    { id: 3, nombre: "Política de Devoluciones", nombreCorto: "Devoluciones", ruta: "#" },
    { id: 4, nombre: "Política de Envíos", nombreCorto: "Envíos", ruta: "#" },
];