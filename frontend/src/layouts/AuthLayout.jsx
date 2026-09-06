import { Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import HeaderAuth from "../components/layout/Header/HeaderAuth"
import FooterAuth from "../components/layout/Footer/FooterAuth"


const AuthLayout = () => {
    return (
        <>
            <HeaderAuth />
            <main className={styles.main}>
                <Outlet />
            </main>
            <FooterAuth />
        </>
    )
}

export default AuthLayout