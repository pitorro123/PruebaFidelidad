import styles from "./HeaderAuth.module.css"
import Logo from "./Logo/Logo"

const HeaderAuth = () => {
    return (
        <header className={styles.header}>
            <Logo />
        </header>
    )
}

export default HeaderAuth