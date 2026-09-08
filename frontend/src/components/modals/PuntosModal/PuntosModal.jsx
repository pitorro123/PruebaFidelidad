import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  cargarCatalogosIniciales,
  consultarPuntos,
  acumularPuntos,
  canjearPuntos,
  obtenerCupones,
  obtenerSocioFidelidad,
  usarCupon,
  guardarCuponAplicado,
  obtenerSaldoDescuento,
  guardarSaldoDescuento,
} from "../../../services/fidelidadService";
import { agregarNotificacion } from "../../../services/notificacionesService";
import { mostrarToast } from "../../../services/toastService";
import styles from "./PuntosModal.module.css";

const PISO_CANJE_SUMAS = 10000;
const PORCENTAJE_DESCUENTO_CANJE = 20;

const formatoNumero = new Intl.NumberFormat("es-CO");

const formatoMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function nombreTipoCupon(tipo) {
  if (tipo === "CUMPLEANOS") return "Bono de cumpleaños";
  if (tipo === "SUMAS_DAYS") return "Sumas Days";
  return tipo;
}

function PuntosModal({ estaAbierto, onCerrar }) {
  const [cargandoCatalogo, setCargandoCatalogo] = useState(true);
  const [error, setError] = useState("");
  const [reintento, setReintento] = useState(0);

  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [busqueda, setBusqueda] = useState({
    tipoIdentificacionId: "",
    numeroIdentificacion: "",
  });
  const [consultando, setConsultando] = useState(false);
  const [datos, setDatos] = useState(null);
  const [saldoDescuento, setSaldoDescuento] = useState(0);
  const [cupones, setCupones] = useState([]);
  const [aplicandoCupon, setAplicandoCupon] = useState(false);
  const [socioRegistrado, setSocioRegistrado] = useState(() => {
    const socio = obtenerSocioFidelidad();
    return Boolean(socio?.tipoIdentificacionId && socio?.numeroIdentificacion?.trim());
  });

  const [accion, setAccion] = useState(null);
  const [formularioAccion, setFormularioAccion] = useState({
    marcaId: "",
    valorCompra: "",
    puntosCanje: "",
    referencia: "",
  });
  const [ejecutando, setEjecutando] = useState(false);

  useEffect(() => {
    let activo = true;

    cargarCatalogosIniciales()
      .then(({ tiposIdentificacion, marcas }) => {
        if (!activo) return;
        setTiposIdentificacion(tiposIdentificacion);
        setMarcas(marcas);
      })
      .catch((e) => {
        if (activo) setError(e?.message || "No se pudieron cargar los catalogos.");
      })
      .finally(() => {
        if (activo) setCargandoCatalogo(false);
      });

    return () => {
      activo = false;
    };
  }, [reintento]);

  const reintentarCarga = () => {
    setError("");
    setCargandoCatalogo(true);
    setReintento((r) => r + 1);
  };

  const limpiar = () => {
    setError("");
    setDatos(null);
    setCupones([]);
    setSaldoDescuento(0);
    setAccion(null);
    setBusqueda({ tipoIdentificacionId: "", numeroIdentificacion: "" });
    setFormularioAccion({
      marcaId: "",
      valorCompra: "",
      puntosCanje: "",
      referencia: "",
    });
  };

  useEffect(() => {
    const actualizar = () => {
      const socio = obtenerSocioFidelidad();
      setSocioRegistrado(Boolean(socio?.tipoIdentificacionId && socio?.numeroIdentificacion?.trim()));
    };
    window.addEventListener("fidelidad:inscrito", actualizar);
    return () => window.removeEventListener("fidelidad:inscrito", actualizar);
  }, []);

  const cargarCupones = (tipoIdentificacionId, numeroIdentificacion) => {
    obtenerCupones(Number(tipoIdentificacionId), numeroIdentificacion.trim())
      .then(setCupones)
      .catch(() => setCupones([]));
  };

  const consultarSocio = useCallback(() => {
    const socioGuardado = obtenerSocioFidelidad();
    if (!socioGuardado?.tipoIdentificacionId || !socioGuardado?.numeroIdentificacion?.trim()) return;
    const tipoIdentificacionId = Number(socioGuardado.tipoIdentificacionId);
    const numeroIdentificacion = socioGuardado.numeroIdentificacion.trim();
    consultarPuntos(tipoIdentificacionId, numeroIdentificacion)
      .then((resultado) => {
        setBusqueda({
          tipoIdentificacionId: String(tipoIdentificacionId),
          numeroIdentificacion,
        });
        setError("");
        setDatos(resultado);
        setSaldoDescuento(
          obtenerSaldoDescuento({ tipoIdentificacionId, numeroIdentificacion })
        );
        setAccion(null);
        return obtenerCupones(tipoIdentificacionId, numeroIdentificacion)
          .then(setCupones)
          .catch(() => setCupones([]));
      })
      .catch((e) => setError(e?.message || "Ocurrio un error al consultar los puntos."));
  }, []);

  const estabaAbierto = useRef(false);

  useEffect(() => {
    const abriendose = estaAbierto && !estabaAbierto.current;
    estabaAbierto.current = estaAbierto;
    if (!abriendose || datos || !socioRegistrado) return;
    consultarSocio();
  }, [estaAbierto, datos, socioRegistrado, consultarSocio]);

  const manejarConsulta = async (evento) => {
    evento.preventDefault();
    setError("");

    if (!busqueda.tipoIdentificacionId || !busqueda.numeroIdentificacion.trim()) {
      setError("Selecciona el tipo e ingresa el numero de identificacion.");
      return;
    }

    setConsultando(true);
    try {
      const resultado = await consultarPuntos(
        Number(busqueda.tipoIdentificacionId),
        busqueda.numeroIdentificacion.trim()
      );
      setDatos(resultado);
      setSaldoDescuento(
        obtenerSaldoDescuento({
          tipoIdentificacionId: Number(busqueda.tipoIdentificacionId),
          numeroIdentificacion: busqueda.numeroIdentificacion.trim(),
        })
      );
      cargarCupones(busqueda.tipoIdentificacionId, busqueda.numeroIdentificacion);
      setAccion(null);
    } catch (e) {
      setError(e?.message || "Ocurrio un error al consultar los puntos.");
    } finally {
      setConsultando(false);
    }
  };

  const manejarAccion = async (evento) => {
    evento.preventDefault();
    setError("");

    if (!formularioAccion.valorCompra) {
      setError("Ingresa el valor de la compra.");
      return;
    }
    const valorCompra = Number(formularioAccion.valorCompra);
    if (valorCompra <= 0) {
      setError("El valor de la compra debe ser mayor a cero.");
      return;
    }

    if (!formularioAccion.marcaId) {
      setError("Selecciona la marca.");
      return;
    }

    const base = {
      tipoIdentificacionId: Number(busqueda.tipoIdentificacionId),
      numeroIdentificacion: busqueda.numeroIdentificacion.trim(),
      marcaId: Number(formularioAccion.marcaId),
    };

    setEjecutando(true);
    try {
      const resultado = await acumularPuntos({
        ...base,
        valorCompra,
        referencia: formularioAccion.referencia.trim() || undefined,
      });

      setDatos(resultado);
      cargarCupones(base.tipoIdentificacionId, base.numeroIdentificacion);
      setFormularioAccion({
        marcaId: "",
        valorCompra: "",
        puntosCanje: "",
        referencia: "",
      });
      setAccion(null);

      const marcaNombre = marcas.find((m) => String(m.id) === String(base.marcaId))?.nombre || "";
      agregarNotificacion({
        id: `puntos-${Date.now()}`,
        referenciaVisual: "fidelidad",
        descripcion: `Acumulaste ${formatoNumero.format(valorCompra)} SUMAS${marcaNombre ? ` comprando en ${marcaNombre}` : ""}.`,
      });
    } catch (e) {
      setError(e?.message || "Ocurrio un error al procesar la transaccion.");
    } finally {
      setEjecutando(false);
    }
  };

  const manejarCanjeDirecto = async () => {
    setError("");
    const puntos = Number(datos.saldoPuntos) || 0;
    if (puntos < PISO_CANJE_SUMAS) {
      setError("Debes acumular al menos 10.000 SUMAS para poder canjear.");
      return;
    }

    const base = {
      tipoIdentificacionId: Number(busqueda.tipoIdentificacionId),
      numeroIdentificacion: busqueda.numeroIdentificacion.trim(),
    };

    setEjecutando(true);
    try {
      const resultado = await canjearPuntos({
        ...base,
        puntos,
        referencia: "Canje directo",
      });

      setDatos(resultado);
      cargarCupones(base.tipoIdentificacionId, base.numeroIdentificacion);
      setFormularioAccion({
        marcaId: "",
        valorCompra: "",
        puntosCanje: "",
        referencia: "",
      });
      setAccion(null);

      const socioReferencia = {
        tipoIdentificacionId: base.tipoIdentificacionId,
        numeroIdentificacion: base.numeroIdentificacion,
      };
      const descuentoGenerado = Math.round(
        (puntos * PORCENTAJE_DESCUENTO_CANJE) / 100
      );
      const saldoPrev = obtenerSaldoDescuento(socioReferencia);
      guardarSaldoDescuento(socioReferencia, saldoPrev + descuentoGenerado);
      setSaldoDescuento(saldoPrev + descuentoGenerado);
      const mensaje = `Canjeaste ${formatoNumero.format(puntos)} SUMAS que se convirtieron en ${formatoMoneda.format(descuentoGenerado)} de descuento (${PORCENTAJE_DESCUENTO_CANJE}%) para tu próxima compra.`;
      mostrarToast(`¡Canje exitoso! ${mensaje}`);
      agregarNotificacion({
        id: `puntos-${Date.now()}`,
        referenciaVisual: "fidelidad",
        descripcion: mensaje,
      });
    } catch (e) {
      setError(e?.message || "Ocurrio un error al procesar la transaccion.");
    } finally {
      setEjecutando(false);
    }
  };

  const manejarAplicarCupon = async (codigo) => {
    setError("");
    setAplicandoCupon(true);
    try {
      const actualizado = await usarCupon(codigo);
      setCupones((prev) =>
        prev.map((c) => (c.codigo === codigo ? actualizado : c))
      );
      guardarCuponAplicado(actualizado, {
        tipoIdentificacionId: Number(busqueda.tipoIdentificacionId),
        numeroIdentificacion: busqueda.numeroIdentificacion.trim(),
      });
      agregarNotificacion({
        id: `cupon-${Date.now()}`,
        referenciaVisual: "fidelidad",
        descripcion: `Aplicaste tu ${nombreTipoCupon(actualizado.tipo)} de ${actualizado.descuentoPorcentaje}% (codigo ${codigo}).`,
      });
    } catch (e) {
      setError(e?.message || "Ocurrio un error al aplicar el cupon.");
    } finally {
      setAplicandoCupon(false);
    }
  };

  if (!estaAbierto) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onCerrar}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.botonCerrar}
          onClick={() => {
            limpiar();
            onCerrar();
          }}
          aria-label="Cerrar"
        >
          &times;
        </button>

        {cargandoCatalogo ? (
          <p className={styles.cargando}>Cargando catalogos...</p>
        ) : marcas.length === 0 && error ? (
          <div className={styles.errorCarga}>
            <p className={styles.mensajeErrorCarga}>{error}</p>
            <button type="button" className={styles.botonReintentar} onClick={reintentarCarga}>
              Reintentar
            </button>
          </div>
        ) : !datos && socioRegistrado ? (
          error ? (
            <div className={styles.errorCarga}>
              <p className={styles.mensajeErrorCarga}>{error}</p>
              <button
                type="button"
                className={styles.botonReintentar}
                onClick={() => {
                  setError("");
                  consultarSocio();
                }}
              >
                Reintentar
              </button>
            </div>
          ) : (
            <p className={styles.cargando}>Cargando tus puntos...</p>
          )
        ) : !datos ? (
          <>
            <div className={styles.cabecera}>
              <p className={styles.badge}>Puntos SUMAS</p>
              <h2 className={styles.titulo}>Consulta tus puntos</h2>
              <p className={styles.subtitulo}>
                Ingresa tu identificacion para ver tu saldo, acumular por compras o canjear.
              </p>
            </div>

            <form className={styles.formulario} onSubmit={manejarConsulta}>
              <div className={styles.fila}>
                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="puntosTipo">
                    Tipo de identificacion
                  </label>
                  <select
                    id="puntosTipo"
                    className={styles.select}
                    value={busqueda.tipoIdentificacionId}
                    onChange={(e) =>
                      setBusqueda((prev) => ({ ...prev, tipoIdentificacionId: e.target.value }))
                    }
                  >
                    <option value="">Selecciona...</option>
                    {tiposIdentificacion.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="puntosNumero">
                    Numero de identificacion
                  </label>
                  <input
                    id="puntosNumero"
                    className={styles.input}
                    type="text"
                    value={busqueda.numeroIdentificacion}
                    onChange={(e) =>
                      setBusqueda((prev) => ({ ...prev, numeroIdentificacion: e.target.value }))
                    }
                    placeholder="123456789"
                  />
                </div>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.botonEnviar} disabled={consultando}>
                {consultando ? "Consultando..." : "Consultar puntos"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className={styles.cabecera}>
              <p className={styles.badge}>Puntos SUMAS</p>
              <h2 className={styles.titulo}>
                Hola, {datos.nombres.split(" ")[0]} {datos.apellidos.split(" ")[0]}
              </h2>
              <p className={styles.documento}>
                {datos.tipoIdentificacionCodigo} {datos.numeroIdentificacion}
              </p>
            </div>

            <div className={styles.tarjetaSaldo}>
              <p className={styles.saldoEtiqueta}>Saldo de SUMAS</p>
              <p className={styles.saldoValor}>{formatoNumero.format(datos.saldoPuntos)}</p>
              <p className={styles.saldoDetalle}>
                Equivalente a {formatoNumero.format(datos.saldoPuntos)} pesos COP para canjear
              </p>
              {saldoDescuento > 0 && (
                <p className={styles.saldoDescuento}>
                  Tienes {formatoMoneda.format(saldoDescuento)} de descuento para tu próxima
                  compra
                </p>
              )}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.acciones}>
              <button
                type="button"
                className={styles.botonAcumular}
                onClick={() => {
                  setError("");
                  setAccion(accion === "acumular" ? null : "acumular");
                }}
              >
                {accion === "acumular" ? "Cancelar acumulacion" : "Acumular por compra"}
              </button>
              <button
                type="button"
                className={styles.botonCanjear}
                onClick={manejarCanjeDirecto}
                disabled={ejecutando}
              >
                {ejecutando ? "Canjeando..." : "Canjear puntos"}
              </button>
            </div>

            {accion === "acumular" && (
              <form className={styles.formularioAccion} onSubmit={manejarAccion}>
                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="accionMarca">
                    Marca
                  </label>
                  <select
                    id="accionMarca"
                    className={styles.select}
                    value={formularioAccion.marcaId}
                    onChange={(e) =>
                      setFormularioAccion((prev) => ({ ...prev, marcaId: e.target.value }))
                    }
                  >
                    <option value="">Selecciona...</option>
                    {marcas.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="valorCompra">
                    Valor de la compra en pesos (1 SUMAS por cada $1)
                  </label>
                  <input
                    id="valorCompra"
                    className={styles.input}
                    type="number"
                    min="1"
                    value={formularioAccion.valorCompra}
                    onChange={(e) =>
                      setFormularioAccion((prev) => ({ ...prev, valorCompra: e.target.value }))
                    }
                    placeholder="ej. 50000"
                  />
                </div>

                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="referencia">
                    Referencia (opcional)
                  </label>
                  <input
                    id="referencia"
                    className={styles.input}
                    type="text"
                    value={formularioAccion.referencia}
                    onChange={(e) =>
                      setFormularioAccion((prev) => ({ ...prev, referencia: e.target.value }))
                    }
                    placeholder="Tickect, factura u orden"
                  />
                </div>

                <button type="submit" className={styles.botonEnviar} disabled={ejecutando}>
                  {ejecutando ? "Procesando..." : "Acumular SUMAS"}
                </button>
              </form>
            )}

            {datos.movimientos.length > 0 && (
              <div className={styles.historial}>
                <h3 className={styles.historialTitulo}>Historial de movimientos</h3>
                <ul className={styles.listaMovimientos}>
                  {datos.movimientos.map((movimiento) => (
                    <li key={movimiento.id} className={styles.movimiento}>
                      <span
                        className={
                          movimiento.tipo === "CANJE"
                            ? styles.movimientoTipoCanje
                            : styles.movimientoTipoAcumulacion
                        }
                      >
                        {movimiento.tipo === "CANJE" ? "-" : "+"}
                        {formatoNumero.format(movimiento.puntos)} SUMAS
                      </span>
                      <span className={styles.movimientoDetalle}>
                        <span className={styles.movimientoMarca}>{movimiento.marca}</span>
                        <span className={styles.movimientoFecha}>{movimiento.fecha}</span>
                      </span>
                      {movimiento.referencia && (
                        <span className={styles.movimientoReferencia}>
                          {movimiento.referencia}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cupones.length > 0 && (
              <div className={styles.historial}>
                <h3 className={styles.historialTitulo}>Mis cupones y bonos</h3>
                <ul className={styles.listaCupones}>
                  {cupones.map((cupon) => (
                    <li key={cupon.id} className={styles.cupon}>
                      <div className={styles.cuponInfo}>
                        <p className={styles.cuponNombre}>
                          {nombreTipoCupon(cupon.tipo)}
                        </p>
                        <p className={styles.cuponDetalle}>
                          {cupon.descuentoPorcentaje}% de descuento · {cupon.codigo} · vence el{" "}
                          {cupon.fechaExpiracion}
                        </p>
                      </div>
                      {cupon.estado === "ACTIVO" ? (
                        <button
                          type="button"
                          className={styles.botonCupon}
                          disabled={aplicandoCupon}
                          onClick={() => manejarAplicarCupon(cupon.codigo)}
                        >
                          {aplicandoCupon ? "Aplicando..." : "Aplicar"}
                        </button>
                      ) : (
                        <span
                          className={
                            cupon.estado === "USADO"
                              ? styles.estadoCuponUsado
                              : styles.estadoCuponExpirado
                          }
                        >
                          {cupon.estado === "USADO" ? "Usado" : "Expirado"}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="button" className={styles.botonVolver} onClick={limpiar}>
              Consultar otro documento
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export default PuntosModal;