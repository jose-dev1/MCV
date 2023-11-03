import React from 'react';
import NavBar from '../components/navComponent';
import About from '../components/abautComponent';
import Footer from '../components/footerComponent';
import Banner from '../components/banerComponent'
import Contacto from '../components/contactoComponent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Perfil1 from '../assets/img/foto-perfil.jpg'
import Perfil2 from '../assets/img/Auxiliar Veterinario.webp'
import Perfil3 from '../assets/img/Foto Perfil groomer.jpg'


export default function Home() {
    return (
        <div>
            <NavBar />
            <Banner />
            <About />
            <div className='main-container'>
                <h2>
                    Nuestro Equipo
                </h2>
                <Grid container spacing={3} className="card-container">
                    <Grid item xs={12} sm={4}>
                        <Card className="card">
                            <CardContent>
                                <div className="avatar">
                                    <Avatar
                                        alt="Nombre de Usuario 1"
                                        src={Perfil1}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <h4>
                                        Eduwin Baca (Veterinario)
                                    </h4>
                                </div>
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                    soy un profesional de la salud animal con un profundo amor y cuidado por los animales. Estos especialistas médicos dedican su vida a garantizar la salud y el bienestar de las mascotas
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className="card">
                            <CardContent>
                                <div className="avatar">
                                    <Avatar
                                        alt="Nombre de Usuario 2"
                                        src={Perfil2}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <h4>
                                        Andrea Jimenez (Auxiliar)
                                    </h4>
                                </div>
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                    soy una profesional que trabaja estrechamente con los veterinarios en clínicas, hospitales y otros entornos de atención médica animal, Mi función principal es proporcionar apoyo.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card className="card">
                            <CardContent>
                                <div className="avatar">
                                    <Avatar
                                        alt="Nombre de Usuario 3"
                                        src={Perfil3}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <h4>
                                        Andres Cantillo (Groomer)
                                    </h4>
                                </div>
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                    soy un  peluquero o estilista canino o felino, es un profesional especializado en el aseo y cuidado estético de mascotas principalmente perros y gatos, es la labor principal de un groomer
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Contacto />
            <Footer />
        </div>
    );
}
