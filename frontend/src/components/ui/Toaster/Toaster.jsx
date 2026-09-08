import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import {
  obtenerToasts,
  suscribirseToasts,
  eliminarToast,
} from "../../../services/toastService";
import styles from "./Toaster.module.css";

const iconosToast = {
  exito: CheckCircle2,
  error: XCircle,
  info: Info,
};

function Toaster() {
  const toasts = useSyncExternalStore(suscribirseToasts, obtenerToasts);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.contenedor} role="region" aria-live="polite">
      {toasts.map((toast) => {
        const Icono = iconosToast[toast.tipo] || iconosToast.info;
        return (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.tipo] || ""}`}
            onClick={() => eliminarToast(toast.id)}
          >
            <Icono className={styles.icono} aria-hidden="true" />
            <p className={styles.mensaje}>{toast.mensaje}</p>
          </div>
        );
      })}
    </div>,
    document.body
  );
}

export default Toaster;