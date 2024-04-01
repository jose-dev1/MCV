import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Logo from "../assets/img/MVC.png";
import { FormControl } from '@mui/material';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import '../assets/css/login.css';

const ValidarPw = () => {
  const [newPw, setNewPw] = useState('');
  const [confirmarPw, setConfirmarPw] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPw !== confirmarPw) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('URL_DE_TU_ENDPOINT', {
        newPw,
        confirmarPw
      });

      console.log(response.data);

      setNewPw('');
      setConfirmarPw('');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
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
              <p className="text-muted" style={{ marginBottom: '60px' }}>Actualiza tu contraseña.</p>
              <div className="login">
                <FormControl fullWidth={true} sx={{ marginBottom: 3 }}>
                  <TextField
                    label="Nueva password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth={true} sx={{ marginBottom: 3 }}>
                  <TextField
                    label="Confirmar password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={confirmarPw}
                    onChange={(e) => setConfirmarPw(e.target.value)}
                  />
                </FormControl>
                <input
                  className='btn'
                  type="submit"
                  value="Enviar"
                /><br />
                <div className='hover-link'>
                  <Link to="/login" sx={{ marginBottom: 2, textDecoration: "none", color: '#888' }} className='link-2' ><i class="ri-user-received-2-fill"></i>Ya tienes una cuenta?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default ValidarPw;
