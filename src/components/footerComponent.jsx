import React from 'react';
import FooterIm from '../assets/img/MVC.png';
import '../assets/css/home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function FooterComponent() {
    return (
        <div>
            <footer className="pie-pagina">
                <div className="grupo-1">
                    <div className="box">
                        <figure>
                            <a href="/">
                                <img src={FooterIm} alt="Logo de SLee Dw" />
                            </a>
                        </figure>
                    </div>
                    <div className="box">
                        <h2>SOBRE NOSOTROS</h2>
                        <p>La Clínica Veterinaria MCV es un lugar dedicado al cuidado y bienestar de tus mascotas.
                            Nuestro equipo de profesionales altamente calificados trabaja incansablemente para
                            garantizar la salud y felicidad de tus amigos peludos. Estamos comprometidos con brindar
                            la mejor atención veterinaria, desde consultas de rutina hasta cirugías y cuidados especializados.</p>
                    </div>
                    <div className="box">
                        <h2>SÍGUENOS</h2>
                        <div className="red-social">
                            <a href="/" className="icono-red-social">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="/" className="icono-red-social">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="/" className="icono-red-social">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/" className="icono-red-social">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grupo-2">
                    <small>&copy; 2023 <b>Mi Can Veterinaria</b> - Todos los Derechos Reservados.</small>
                </div>
            </footer>
        </div>
    );
}
