import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import pse from "../assets/imagenes/metodos-pago/pse.svg"

export const metodosPago = [
    { id: 1, nombre: "Mastercard", recurso: FaCcMastercard, tipo: "icono" },
    { id: 2, nombre: "VISA", recurso: FaCcVisa, tipo: "icono" },
    { id: 3, nombre: "PSE", recurso: pse, tipo: "imagen" },
]