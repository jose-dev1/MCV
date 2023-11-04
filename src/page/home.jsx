import React from 'react';
import NavBar from '../components/navComponent';
import About from '../components/abautComponent';
import Footer from '../components/footerComponent';
import Banner from '../components/banerComponent'
import Contacto from '../components/contactoComponent';
import Equipo from '../components/teamComponent';


export default function Home() {
    return (
        <div>
            <NavBar />
            <Banner />
            <Equipo />
            <About />
            <Contacto />
            <Footer />
        </div>
    );
}
