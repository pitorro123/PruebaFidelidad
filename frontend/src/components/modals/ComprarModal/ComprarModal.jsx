import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  obtenerMarcas,
  acumularPuntos,
  obtenerSocioFidelidad,
  obtenerCuponAplicado,
  limpiarCuponAplicado,
  obtenerSaldoDescuento,
  guardarSaldoDescuento,
} from "../../../services/fidelidadService";
import { agregarNotificacion } from "../../../services/notificacionesService";
import { mostrarToast } from "../../../services/toastService";
import { RUTAS } from "../../../constants/rutas";
import styles from "./ComprarModal.module.css";

const formatoMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function enmascararDocumento(numero) {
  const texto = String(numero || "");
  if (texto.length <= 4) return texto;
  return `•••• ${texto.slice(-4)}`;
}

function nombreTipoCupon(tipo) {
  if (tipo === "CUMPLEANOS") return "Bono de cumpleaños";
  if (tipo === "SUMAS_DAYS") return "Sumas Days";
  return tipo;
}

function ComprarModal({ estaAbierto, onCerrar, producto = {}, talla, cantidad, onCompraExitosa }) {
  const navigate = useNavigate();
  const [socio, setSocio] = useState(null);
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [saldoDescuento, setSaldoDescuento] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;
    const cargarSocio = () => {
      const socioGuardado = obtenerSocioFidelidad();
      if (activo) {
        setSocio(socioGuardado);
        setCuponAplicado(obtenerCuponAplicado(socioGuardado));
        setSaldoDescuento(obtenerSaldoDescuento(socioGuardado));
        setError("");
      }
    };
    if (estaAbierto) {
      cargarSocio();
      window.addEventListener("fidelidad:inscrito", cargarSocio);
    }
    return () => {
      activo = false;
      window.removeEventListener("fidelidad:inscrito", cargarSocio);
    };
  }, [estaAbierto]);

  if (!estaAbierto) return null;

  const totalCompra = Number(producto.precio || 0) * Number(cantidad || 1);
  const descuento = cuponAplicado
    ? Math.round((totalCompra * Number(cuponAplicado.descuentoPorcentaje)) / 100)
    : 0;
  const totalPagar = totalCompra - descuento;
  const descuentoCanje = Math.min(totalPagar, saldoDescuento);
  const totalFinal = totalPagar - descuentoCanje;
  const hayDescuento = cuponAplicado && totalPagar > 0;
  const hayCanje = descuentoCanje > 0;

  const irAInscripcion = () => {
    onCerrar();
    window.dispatchEvent(new CustomEvent("fidelidad:solicitarRegistro"));
    navigate(RUTAS.LANDING_PAGE);
  };

  const manejarCompra = async (evento) => {
    evento.preventDefault();
    setError("");

    let marcaId;
    let marcaNombre = producto.marca || "";
    try {
      const marcas = await obtenerMarcas();
      const marca = marcas.find(
        (m) => String(m.nombre).toLowerCase() === String(marcaNombre).toLowerCase()
      );
      marcaId = marca?.id;
    } catch {
      marcaId = null;
    }

    if (!marcaId) {
      setError("La marca del producto no tiene convenio SUMAS.");
      return;
    }

    setCargando(true);
    const ahorroTotal = descuento + descuentoCanje;
    try {
      if (totalFinal > 0) {
        await acumularPuntos({
          tipoIdentificacionId: Number(socio.tipoIdentificacionId),
          numeroIdentificacion: socio.numeroIdentificacion.trim(),
          marcaId,
          valorCompra: totalFinal,
          referencia: `COMPRA-${Date.now()}`,
        });
        guardarSaldoDescuento(socio, saldoDescuento - descuentoCanje);
      } else {
        guardarSaldoDescuento(socio, 0);
      }

      const tallaTexto = talla?.nombre ? `Talla ${talla.nombre}, ` : "";
      agregarNotificacion({
        id: `carrito-${Date.now()}`,
        referenciaVisual: "pedido",
        descripcion: `Añadido al carrito: ${producto.nombre} (${tallaTexto}x${cantidad}) por ${formatoMoneda.format(totalFinal)}.${ahorroTotal ? ` Te ahorraste ${formatoMoneda.format(ahorroTotal)} con tus beneficios SUMAS.` : ""}`,
      });
      agregarNotificacion({
        id: `compra-${Date.now()}`,
        referenciaVisual: "fidelidad",
        descripcion: `Compra registrada${totalFinal > 0 ? `: acumulaste ${formatoMoneda.format(totalFinal)} SUMAS comprando en ${marcaNombre}` : " con tu saldo de descuento SUMAS"}.${ahorroTotal ? ` Te ahorraste ${formatoMoneda.format(ahorroTotal)}.` : ""}`,
      });
      mostrarToast(
        totalFinal > 0
          ? `¡Compra exitosa! Acumulaste ${formatoMoneda.format(totalFinal)} SUMAS.${ahorroTotal ? ` Te ahorraste ${formatoMoneda.format(ahorroTotal)}.` : ""}`
          : `¡Compra exitosa! Tu prenda fue cubierta por tus descuentos SUMAS.`
      );

      limpiarCuponAplicado(socio);
      onCompraExitosa?.();
      onCerrar();
    } catch (e) {
      setError(e?.message || "Ocurrio un error al procesar la compra.");
    } finally {
      setCargando(false);
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={onCerrar}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="comprar-modal-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.botonCerrar}
          onClick={onCerrar}
          aria-label="Cerrar"
        >
          &times;
        </button>

        {!socio ? (
          <div className={styles.cabecera}>
            <p className={styles.badge}>Compra SUMAS</p>
            <h2 id="comprar-modal-titulo" className={styles.titulo}>
              Aún no estás inscrito
            </h2>
            <p className={styles.subtitulo}>
              Para comprar y acumular puntos debes inscribirte primero en el programa de
              fidelidad SUMAS.
            </p>

            {error && <p className={styles.error}>{error}</p>}

            <button type="button" className={styles.botonComprar} onClick={irAInscripcion}>
              Inscribirme en el club
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cabecera}>
              <p className={styles.badge}>Compra SUMAS</p>
              <h2 id="comprar-modal-titulo" className={styles.titulo}>
                Confirmar compra
              </h2>
              <p className={styles.subtitulo}>
                Tu compra suma {formatoMoneda.format(totalFinal)} a tus puntos SUMAS.
                {(hayDescuento || hayCanje) &&
                  ` Aplicas ${[
                    hayDescuento ? `${nombreTipoCupon(cuponAplicado.tipo)} -${formatoMoneda.format(descuento)}` : "",
                    hayCanje ? `tus puntos canjeados -${formatoMoneda.format(descuentoCanje)}` : "",
                  ]
                    .filter(Boolean)
                    .join(" y ")}.`}
              </p>
            </div>

            <div className={styles.socio}>
              <p className={styles.socioNombre}>
                {socio.nombres} {socio.apellidos}
              </p>
              <p className={styles.socioDocumento}>
                Documento {enmascararDocumento(socio.numeroIdentificacion)}
              </p>
            </div>

            <div className={styles.resumen}>
              <p className={styles.resumenNombre}>{producto.nombre}</p>
              <p className={styles.resumenDetalle}>
                {talla?.nombre ? `Talla ${talla.nombre} · ` : ""}
                Cantidad {cantidad} · {producto.marca}
              </p>
              {hayDescuento || hayCanje ? (
                <>
                  <p className={styles.resumenPrecioOriginal}>
                    {formatoMoneda.format(totalCompra)}
                  </p>
                  {hayDescuento && (
                    <div className={styles.resumenDescuento}>
                      <span>
                        {nombreTipoCupon(cuponAplicado.tipo)} ({cuponAplicado.descuentoPorcentaje}%)
                      </span>
                      <span>-{formatoMoneda.format(descuento)}</span>
                    </div>
                  )}
                  {hayCanje && (
                    <div className={styles.resumenCanje}>
                      <span>Descuento por puntos canjeados</span>
                      <span>-{formatoMoneda.format(descuentoCanje)}</span>
                    </div>
                  )}
                  <div className={styles.resumenTotalPagar}>
                    <span>Total a pagar</span>
                    <span>{formatoMoneda.format(totalFinal)}</span>
                  </div>
                </>
              ) : (
                <p className={styles.resumenTotal}>{formatoMoneda.format(totalCompra)}</p>
              )}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="button"
              className={styles.botonComprar}
              disabled={cargando}
              onClick={manejarCompra}
            >
              {cargando ? "Procesando..." : "Comprar y sumar puntos"}
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export default ComprarModal;