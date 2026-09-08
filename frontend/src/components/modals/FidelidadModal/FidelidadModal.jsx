import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  cargarCatalogosIniciales,
  obtenerDepartamentos,
  obtenerCiudades,
  registrarClienteFidelidad,
  guardarSocioFidelidad,
} from "../../../services/fidelidadService";
import { agregarNotificacion } from "../../../services/notificacionesService";
import styles from "./FidelidadModal.module.css";

const VISTA_FORMULARIO = "formulario";
const VISTA_EXITO = "exito";

function calcularEdad(fecha) {
  if (!fecha) return null;
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

function FidelidadModal({ estaAbierto, onCerrar }) {
  const [vista, setVista] = useState(VISTA_FORMULARIO);
  const [cargandoCatalogo, setCargandoCatalogo] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
  const [paises, setPaises] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [reintento, setReintento] = useState(0);
  const [registroExitoso, setRegistroExitoso] = useState(null);

  const [formulario, setFormulario] = useState({
    email: "",
    tipoIdentificacionId: "",
    numeroIdentificacion: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    direccion: "",
    paisId: "",
    departamentoId: "",
    ciudadId: "",
    marcaId: "",
  });

  useEffect(() => {
    let activo = true;

    cargarCatalogosIniciales()
      .then(({ tiposIdentificacion, paises, marcas }) => {
        if (!activo) return;
        setTiposIdentificacion(tiposIdentificacion);
        setPaises(paises);
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
    setCargando(false);
    setReintento((r) => r + 1);
  };

  const actualizarCampo = (campo, valor) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));

    if (campo === "paisId") {
      setFormulario((prev) => ({ ...prev, departamentoId: "", ciudadId: "" }));
      setCiudades([]);
      setDepartamentos([]);
      if (valor) {
        obtenerDepartamentos(valor)
          .then(setDepartamentos)
          .catch((e) => setError(e?.message || "No se pudieron cargar los departamentos."));
      }
    }

    if (campo === "departamentoId") {
      setFormulario((prev) => ({ ...prev, ciudadId: "" }));
      setCiudades([]);
      if (valor) {
        obtenerCiudades(valor)
          .then(setCiudades)
          .catch((e) => setError(e?.message || "No se pudieron cargar las ciudades."));
      }
    }
  };

  const validarFormulario = () => {
    if (!formulario.email.trim()) return "Ingresa tu correo electronico.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim())) return "Ingresa un correo electronico valido.";
    if (!formulario.tipoIdentificacionId) return "Selecciona el tipo de identificacion.";
    if (!formulario.numeroIdentificacion.trim()) return "Ingresa el numero de identificacion.";
    if (!formulario.nombres.trim()) return "Ingresa tus nombres.";
    if (!formulario.apellidos.trim()) return "Ingresa tus apellidos.";
    if (!formulario.fechaNacimiento) return "Selecciona tu fecha de nacimiento.";
    const edad = calcularEdad(formulario.fechaNacimiento);
    if (edad === null || edad < 18) return "Debes ser mayor de 18 anios para inscribirte.";
    if (!formulario.direccion.trim()) return "Ingresa tu direccion.";
    if (!formulario.paisId) return "Selecciona tu pais.";
    if (!formulario.departamentoId) return "Selecciona tu departamento.";
    if (!formulario.ciudadId) return "Selecciona tu ciudad.";
    if (!formulario.marcaId) return "Selecciona la marca a la que deseas registrarte.";
    return "";
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError("");

    const mensajeError = validarFormulario();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setCargando(true);
    try {
      const datos = {
        email: formulario.email.trim(),
        tipoIdentificacionId: Number(formulario.tipoIdentificacionId),
        numeroIdentificacion: formulario.numeroIdentificacion.trim(),
        nombres: formulario.nombres.trim(),
        apellidos: formulario.apellidos.trim(),
        fechaNacimiento: formulario.fechaNacimiento,
        direccion: formulario.direccion.trim(),
        ciudadId: Number(formulario.ciudadId),
        departamentoId: Number(formulario.departamentoId),
        paisId: Number(formulario.paisId),
        marcaId: Number(formulario.marcaId),
      };
      const marcaSeleccionada = marcas.find((m) => String(m.id) === String(formulario.marcaId))?.nombre || "";
      await registrarClienteFidelidad(datos);
      setRegistroExitoso({
        nombres: formulario.nombres.trim(),
        marca: marcaSeleccionada,
      });
      agregarNotificacion({
        id: `fidelidad-${Date.now()}`,
        referenciaVisual: "fidelidad",
        descripcion: `Te registraste en el programa de fidelidad${marcaSeleccionada ? ` de ${marcaSeleccionada}` : ""}. Ya cuentas con tu 20% de descuento en tu primera compra.`,
      });
      localStorage.setItem("fidelidadInscrito", "true");
      guardarSocioFidelidad({
        tipoIdentificacionId: Number(formulario.tipoIdentificacionId),
        numeroIdentificacion: formulario.numeroIdentificacion.trim(),
        nombres: formulario.nombres.trim(),
        apellidos: formulario.apellidos.trim(),
      });
      window.dispatchEvent(new CustomEvent("fidelidad:inscrito"));
      setVista(VISTA_EXITO);
    } catch (e) {
      setError(e?.message || "Ocurrio un error al registrar. Intentalo de nuevo.");
    } finally {
      setCargando(false);
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
        {vista === VISTA_FORMULARIO ? (
          <>
            <button
              type="button"
              className={styles.botonCerrar}
              onClick={onCerrar}
              aria-label="Cerrar"
            >
              &times;
            </button>

            <div className={styles.cabecera}>
              <p className={styles.badge}>Beneficio exclusivo</p>
              <h2 className={styles.titulo}>Ahorra 20% en tu primera compra</h2>
              <p className={styles.subtitulo}>
                Registrate gratis con la marca de tu preferencia y desbloquea descuentos,
                trueques y ofertas especiales.
              </p>
            </div>

            {cargandoCatalogo ? (
              <p className={styles.cargando}>Cargando catalogos...</p>
            ) : tiposIdentificacion.length === 0 && error ? (
              <div className={styles.errorCarga}>
                <p className={styles.mensajeErrorCarga}>{error}</p>
                <button
                  type="button"
                  className={styles.botonReintentar}
                  onClick={reintentarCarga}
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="email">
                    Correo electronico
                  </label>
                  <input
                    id="email"
                    className={styles.input}
                    type="email"
                    value={formulario.email}
                    onChange={(e) => actualizarCampo("email", e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="tipoIdentificacion">
                    Tipo de identificacion
                  </label>
                  <select
                    id="tipoIdentificacion"
                    className={styles.select}
                    value={formulario.tipoIdentificacionId}
                    onChange={(e) => actualizarCampo("tipoIdentificacionId", e.target.value)}
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
                  <label className={styles.etiqueta} htmlFor="numeroIdentificacion">
                    Numero de identificacion
                  </label>
                  <input
                    id="numeroIdentificacion"
                    className={styles.input}
                    type="text"
                    value={formulario.numeroIdentificacion}
                    onChange={(e) => actualizarCampo("numeroIdentificacion", e.target.value)}
                    placeholder="123456789"
                  />
                </div>

                <div className={styles.fila}>
                  <div className={styles.grupo}>
                    <label className={styles.etiqueta} htmlFor="nombres">
                      Nombres
                    </label>
                    <input
                      id="nombres"
                      className={styles.input}
                      type="text"
                      value={formulario.nombres}
                      onChange={(e) => actualizarCampo("nombres", e.target.value)}
                      placeholder="Tus nombres"
                    />
                  </div>
                  <div className={styles.grupo}>
                    <label className={styles.etiqueta} htmlFor="apellidos">
                      Apellidos
                    </label>
                    <input
                      id="apellidos"
                      className={styles.input}
                      type="text"
                      value={formulario.apellidos}
                      onChange={(e) => actualizarCampo("apellidos", e.target.value)}
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                <div className={styles.fila}>
                  <div className={styles.grupo}>
                    <label className={styles.etiqueta} htmlFor="fechaNacimiento">
                      Fecha de nacimiento
                    </label>
                    <input
                      id="fechaNacimiento"
                      className={styles.input}
                      type="date"
                      value={formulario.fechaNacimiento}
                      onChange={(e) => actualizarCampo("fechaNacimiento", e.target.value)}
                    />
                  </div>
                  <div className={styles.grupo}>
                    <label className={styles.etiqueta} htmlFor="direccion">
                      Direccion
                    </label>
                    <input
                      id="direccion"
                      className={styles.input}
                      type="text"
                      value={formulario.direccion}
                      onChange={(e) => actualizarCampo("direccion", e.target.value)}
                      placeholder="Calle, carrera, etc."
                    />
                  </div>
                </div>

                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="pais">
                    Pais
                  </label>
                  <select
                    id="pais"
                    className={styles.select}
                    value={formulario.paisId}
                    onChange={(e) => actualizarCampo("paisId", e.target.value)}
                  >
                    <option value="">Selecciona...</option>
                    {paises.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.fila}>
                  <div className={styles.grupo}>
                    <label className={styles.etiqueta} htmlFor="departamento">
                      Departamento
                    </label>
                    <select
                      id="departamento"
                      className={styles.select}
                      value={formulario.departamentoId}
                      onChange={(e) => actualizarCampo("departamentoId", e.target.value)}
                      disabled={!formulario.paisId}
                    >
                      <option value="">Selecciona...</option>
                      {departamentos.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.grupo}>
                    <label className={styles.etiqueta} htmlFor="ciudad">
                      Ciudad
                    </label>
                    <select
                      id="ciudad"
                      className={styles.select}
                      value={formulario.ciudadId}
                      onChange={(e) => actualizarCampo("ciudadId", e.target.value)}
                      disabled={!formulario.departamentoId}
                    >
                      <option value="">Selecciona...</option>
                      {ciudades.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.grupo}>
                  <label className={styles.etiqueta} htmlFor="marca">
                    Marca a la que deseas registrarte
                  </label>
                  <select
                    id="marca"
                    className={styles.select}
                    value={formulario.marcaId}
                    onChange={(e) => actualizarCampo("marcaId", e.target.value)}
                  >
                    <option value="">Selecciona...</option>
                    {marcas.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button
                  type="submit"
                  className={styles.botonEnviar}
                  disabled={cargando}
                >
                  {cargando ? "Registrando..." : "Registrarme en fidelidad"}
                </button>
              </form>
            )}
          </>
        ) : (
          <div className={styles.exito}>
            <div className={styles.iconoExito}>&#10003;</div>
            <h2 className={styles.tituloExito}>Bienvenido al club, {registroExitoso?.nombres?.split(" ")[0] || ""}</h2>
            <p className={styles.mensajeExito}>
              Tu registro en el programa de fidelidad{registroExitoso?.marca ? ` de ${registroExitoso.marca}` : ""} fue exitoso.
              Ya puedes disfrutar de tu <strong>20% de descuento</strong> en tu primera compra.
            </p>
            <ul className={styles.listaBeneficios}>
              <li>20% de descuento en tu primera compra</li>
              <li>Ofertas exclusivas de tu marca</li>
            </ul>
            <button type="button" className={styles.botonEnviar} onClick={onCerrar}>
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default FidelidadModal;
