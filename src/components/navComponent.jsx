import React, { useState, useEffect } from "react";
import Logo from '../assets/img/MVC.png';
import '../assets/css/home.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import '../assets/css/home.css'

const NavBar = ({ autenticado }) => {
    const [scrollAbajo, setScrollAbajo] = useState(false);

    useEffect(() => {
        function manejarScroll() {
            if (window.scrollY > 0) {
                setScrollAbajo(true);
            } else {
                setScrollAbajo(false);
            }
        }

        window.addEventListener('scroll', manejarScroll);

        return () => {
            window.removeEventListener('scroll', manejarScroll);
        };
    }, []);
    return (
        <header className={`header ${scrollAbajo ? 'navbar-fijo' : ''}`}>
            <div className="logo-container">
                <img src={Logo} height="85" alt="Logo" />
            </div>
            <nav>
                <ul className="nav-container">
                    <li>
                        <Link to="/">Nuestro Equipo</Link>
                    </li>
                    <li>
                        <Link to="/">Nuestros Servicios</Link>
                    </li>
                    <li>
                        <Link to="/">Quienes somos</Link>
                    </li>
                    <li>
                        <Link to="/contacto">Contacto</Link>
                    </li>
                    {autenticado ? (
                        <li>
                            <Avatar alt="Usuario" src="/ruta-al-avatar.jpg" />
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" >Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;

