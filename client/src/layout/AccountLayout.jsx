import { Outlet } from 'react-router-dom';
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { PageLogin } from '../pages/auth/PageLogin';

export function AccountLayout() {
    const { loginStatus } = useContext(GlobalContext);

    return (
        <>
            <Header />
            {loginStatus ? <Outlet /> : <PageLogin />}
            <Footer />
        </>
    );
}