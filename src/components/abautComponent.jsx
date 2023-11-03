import React from 'react';
import Logo from '../assets/img/Pets.png'

const About = () => {
    return (
        <div className="about-us">
            <div className="description">
                <h2>Quiénes Somos</h2>
                <p>
                    La Clínica Veterinaria MCV es un lugar dedicado al cuidado y bienestar de tus mascotas.
                    Nuestro equipo de profesionales altamente calificados trabaja incansablemente para
                    garantizar la salud y felicidad de tus amigos peludos. Estamos comprometidos con brindar
                    la mejor atención veterinaria, desde consultas de rutina hasta cirugías y cuidados especializados.
                </p>
            </div>
            <div className="image">
                <img src={Logo} alt="Imagen de la clínica" />
            </div>
        </div>
    );
};

export default About;
