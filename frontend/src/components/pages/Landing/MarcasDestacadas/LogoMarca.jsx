import styles from "../MarcasDestacadas/MarcasDestacadas.module.css";

function LogoMarca({ nombre, logo }) {
    return (
        <div className={styles.logoItem}>
            <img src={logo} alt={nombre} className={styles.logoImage} />
        </div>
    );
}

export default LogoMarca;