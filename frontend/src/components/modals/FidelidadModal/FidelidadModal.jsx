import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  cargarCatalogosIniciales,
  obtenerDepartamentos,
  obtenerCiudades,
  registrarClienteFidelidad,
} from "../../../services/fidelidadService";
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

  const [formulario, setFormulario] = useState({
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
  }, []);

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
      await registrarClienteFidelidad(datos);
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

            <h2 className={styles.titulo}>Programa de fidelidad</h2>
            <p className={styles.subtitulo}>
              Registrate en el programa de fidelidad de la marca de tu preferencia y disfruta de beneficios exclusivos.
            </p>

            {cargandoCatalogo ? (
              <p className={styles.cargando}>Cargando catalogos...</p>
            ) : (
              <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
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
            <h2 className={styles.tituloExito}>Registro exitoso</h2>
            <p className={styles.mensajeExito}>
              Te registraste en el programa de fidelidad con exito.
            </p>
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
