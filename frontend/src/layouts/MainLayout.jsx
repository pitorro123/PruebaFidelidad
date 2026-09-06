import { Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import Header from "../components/layout/Header/Header"
import Footer from "../components/layout/Footer/Footer"

const MainLayout = () => {
    return (
        <>
            <Header />

            <main className={`${styles.main} ${styles.mainPrincipal}`}>
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default MainLayout