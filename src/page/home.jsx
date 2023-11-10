import React from 'react';
import NavBar from '../components/navComponent';
import About from '../components/abautComponent';
import Footer from '../components/footerComponent';
import Banner from '../components/banerComponent'
import Contacto from '../components/contactoComponent';
import Equipo from '../components/teamComponent';
import Header from '../components/headerComponent';
import '../assets/css/home.css'

export default function Home() {
    return (
        <div className='fade-in'>
            <Header />
            <NavBar />
            <Banner id="servicio" />
            <Equipo id="Team" />
            <About id="Abaut" />
            <Contacto id="contacto" />
            <Footer />
        </div>
    );
}
