import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, useLocation, } from 'react-router-dom';
import Logo from "../assets/img/MVC.png";
import { FormControl } from '@mui/material';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import Swal from 'sweetalert2';

const ValidarPw = () => {
  const [newPw, setNewPw] = useState('');
  const [value, setValue] = useState('');
  const location = useLocation();
  const [correo_verificacion, setCorreoVerificacion] = useState('');
  const [originalCorreo, setOriginalCorreo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const correo = new URLSearchParams(location.search).get('correo_verificacion');
    setCorreoVerificacion(correo);
    if (!correo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo de verificación no está presente en la URL',
      }).then(() => {
        navigate('/login');
      });
    } else {
      setOriginalCorreo(correo);
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (originalCorreo && correo_verificacion && correo_verificacion !== originalCorreo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo de verificación ha sido alterado',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [correo_verificacion, originalCorreo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPw !== value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:4321/registro/actualizarPassword/${correo_verificacion}`, {
        value
      });
      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada correctamente',
      });
      console.log(response.data);
      navigate('/login');
      setNewPw('');
      setValue('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al enviar la solicitud',
      });
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
                    label="Nueva contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth={true} sx={{ marginBottom: 3 }}>
                  <TextField
                    label="Confirmar contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </FormControl>
                <input
                  className='btn'
                  type="submit"
                  value="Actualizar"
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

export default ValidarPw;
