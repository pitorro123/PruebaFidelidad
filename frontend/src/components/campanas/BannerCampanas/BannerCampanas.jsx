import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { obtenerCampanasActivas } from "../../../services/fidelidadService";
import styles from "./BannerCampanas.module.css";

function formatearFecha(fecha) {
  if (!fecha) return "";
  const [anio, mes, dia] = String(fecha).split("-");
  return `${dia}/${mes}/${anio}`;
}

function BannerCampanas() {
  const [campanas, setCampanas] = useState([]);

  useEffect(() => {
    let activo = true;
    obtenerCampanasActivas()
      .then((lista) => {
        if (activo) setCampanas(lista);
      })
      .catch(() => {
        if (activo) setCampanas([]);
      });
    return () => {
      activo = false;
    };
  }, []);

  if (campanas.length === 0) return null;

  const campana = campanas[0];

  return (
    <div className={styles.banner}>
      <Sparkles className={styles.icono} aria-hidden="true" />
      <div className={styles.contenido}>
        <p className={styles.nombre}>{campana.nombre}</p>
        <p className={styles.texto}>
          {campana.descripcion}. <strong>{campana.descuentoPorcentaje}% de descuento</strong>{" "}
          para los miembros del club. Valido hasta el {formatearFecha(campana.fechaFin)}.
        </p>
      </div>
    </div>
  );
}

export default BannerCampanas;