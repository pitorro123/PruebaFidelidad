import { useState } from 'react';
import styles from '../../../pages/DetalleProducto.module.css';

const InformacionProducto = ({ producto = {}, onAgregarCarrito, onProponerTrueque }) => {
  const tallasDisponibles = producto.tallas || [];
  const [tallaSeleccionada, setTallaSeleccionada] = useState(tallasDisponibles[0] || null);
  const [cantidad, setCantidad] = useState(1);
  const [agregadoAlCarrito, setAgregadoAlCarrito] = useState(false);
  const [estadoTrueque, setEstadoTrueque] = useState(false); // Simula si ya propuso trueque o tiene uno asociado

  if (!producto || Object.keys(producto).length === 0) return null;

  const handleDecrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleIncrementar = () => {
    if (cantidad < producto.cantidadDisponible) setCantidad(cantidad + 1);
  };

  const handleAgregarClick = () => {
    onAgregarCarrito(producto, tallaSeleccionada, cantidad);
    setAgregadoAlCarrito(true);
    alert("¡Producto añadido al carrito con éxito!");
  };

  return (
    <div className={styles.infoProductoContainer}>
      <span className={styles.productoMarca}>{producto.marca}</span>
      <h1 className={styles.productoTitulo}>{producto.nombre}</h1>
      <span className={styles.productoVendedor}>👤 {producto.vendedor} ★ {Number(producto.calificacion).toFixed(1)} </span>
      <span className={styles.productoPrecio}>${producto.precio.toLocaleString()}</span>

      {/* Selección de Talla */}
      <div className={styles.seccionTallas}>
        <label>TALLA</label>
        <div className={styles.tallasGrid}>
          {producto.tallas.map((talla) => (
            <button
              key={talla.id}
              onClick={() => setTallaSeleccionada(talla)}
              className={`${styles.tallaBtn} ${tallaSeleccionada?.id === talla.id ? styles.seleccionada : ''}`}
            >
              {talla.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Control de Cantidad */}
      <div className={styles.seccionCantidad}>
        <label>CANTIDAD</label>
        <div className={styles.controlCantidad}>
          <button onClick={handleDecrementar} disabled={cantidad === 1}>-</button>
          <span>{cantidad}</span>
          <button onClick={handleIncrementar} disabled={cantidad >= producto.cantidadDisponible}>+</button>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className={styles.accionesContainer}>
        <button 
          onClick={handleAgregarClick} 
          className={`${styles.btnCarrito} ${agregadoAlCarrito ? styles.agregado : ''}`}
          disabled={agregadoAlCarrito}
        >
          {agregadoAlCarrito ? 'Añadido al carrito' : 'Añadir al carrito'}
        </button>

        <button 
          onClick={() => {
            onProponerTrueque();
            setEstadoTrueque(true);
          }} 
          className={styles.btnTrueque}
        >
          {estadoTrueque ? 'Trueque propuesto' : 'Proponer Trueque'}
        </button>
      </div>
    </div>
  );
};

export default InformacionProducto;