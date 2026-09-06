import { useState } from 'react';
import styles from '../../../pages/DetalleProducto.module.css';

const SeccionesProducto = ({ infoSecciones = {}, producto = {} }) => {
  const secciones = [
    { id: 'descripcion', titulo: 'Descripción', contenido: infoSecciones.descripcion },
    { id: 'detalles', titulo: 'Detalles del producto', contenido: infoSecciones.detalles },
    { id: 'preguntas', titulo: 'Preguntas', contenido: infoSecciones.preguntas }
  ];

  const [seccionActiva, setSeccionActiva] = useState(secciones[0]?.id || null);

  if (!infoSecciones || Object.keys(infoSecciones).length === 0) return null;

  const seccionActual = secciones.find(s => s.id === seccionActiva);

  // Parsear detalles en pares label:value si vienen en formato de líneas
  const parseDetalles = (texto = '') => {
    const lines = texto.split('\n').map(l => l.trim()).filter(Boolean);
    const map = {};
    lines.forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        map[key.trim()] = rest.join(':').trim();
      }
    });
    return map;
  };

  const detallesMap = parseDetalles(infoSecciones.detalles || '');

  return (
    <div className={styles.seccionesContainer}>
      <div className={styles.tabsHeader}>
        {secciones.map((seccion) => (
          <button
            key={seccion.id}
            onClick={() => setSeccionActiva(seccion.id)}
            className={`${styles.tabBtn} ${seccionActiva === seccion.id ? styles.activa : ''}`}
          >
            {seccion.titulo}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {seccionActiva === 'descripcion' && (
          <div>
            <p className={styles.descripcionText}>{infoSecciones.descripcion}</p>
          </div>
        )}

        {seccionActiva === 'detalles' && (
          <div>
            <table className={styles.detallesTable}>
              <tbody>
                <tr>
                  <td className={styles.detallesLabel}>Estado</td>
                  <td className={styles.detallesValue}>{detallesMap['Estado'] || ''}</td>
                </tr>
                <tr>
                  <td className={styles.detallesLabel}>Material</td>
                  <td className={styles.detallesValue}>{detallesMap['Material'] || ''}</td>
                </tr>
                <tr>
                  <td className={styles.detallesLabel}>Medidas</td>
                  <td className={styles.detallesValue}>{detallesMap['Medidas'] || ''}</td>
                </tr>
                <tr>
                  <td className={styles.detallesLabel}>Marca</td>
                  <td className={styles.detallesValue}>{producto.marca || detallesMap['Marca'] || ''}</td>
                </tr>
                <tr>
                  <td className={styles.detallesLabel}>Publicado</td>
                  <td className={styles.detallesValue}>{detallesMap['Publicado'] || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {seccionActiva === 'preguntas' && (
          <p>{seccionActual?.contenido}</p>
        )}
      </div>
    </div>
  );
};

export default SeccionesProducto;