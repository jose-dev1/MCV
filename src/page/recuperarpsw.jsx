import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Logo from "../assets/img/MVC.png"
import { FormControl } from '@mui/material';
import 'remixicon/fonts/remixicon.css'
import '../assets/css/login.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const RecuperarPw = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4321/registro/recuperar_password', { email });
      console.log('Correo electrónico enviado con éxito:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Correo electrónico enviado con éxito',
      });
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error.message);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Hubo un problema al enviar el correo electrónico',
      });
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Box
        sx={{
          boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.3)',
          padding: '19px',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <div>
          <div className="login-content">
            <form id="loginForm" onSubmit={handleSubmit}>
              <img src={Logo} height="150" alt="" className='img-center' />
              <h4 className="" style={{ marginBottom: '5px' }}>Bienvenido !</h4>
              <p className="text-muted" style={{ marginBottom: '60px' }}>Recupera tu contraseña con el correo.</p>
              <div className="login">
                <FormControl fullWidth={true} sx={{ marginBottom: 3 }}>
                  <TextField
                    label="Correo Electronico"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <input
                  className='btn'
                  type="submit"
                  value="Enviar"
                /><br />
                <div className='hover-link'>
                  <Link to="/login" sx={{ marginBottom: 2, textDecoration: "none", color: '#888' }} className='link-2' ><i className="ri-user-received-2-fill"></i>Ya tienes una cuenta?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default RecuperarPw;
