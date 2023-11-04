import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Logo from '../assets/img/MVC.png';
import { FormControl } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import 'remixicon/fonts/remixicon.css';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState(false);
  const [recuerdame, setRecuerdame] = useState(false);
  const navigate = useNavigate();

  const authSesion = (e) => {
    e.preventDefault();

    if (!validarCorreo(correo)) {
      setMensajeError('Correo electrónico no válido');
      setErrorCorreo(true);
      setErrorContraseña(false);
      setMostrarAlerta(true);
      return;
    }

    if (contraseña.length < 6) {
      setMensajeError('La contraseña debe tener al menos 6 caracteres');
      setErrorCorreo(false);
      setErrorContraseña(true);
      setMostrarAlerta(true);
      return;
    }

    axios
      .post('http://localhost:4000/postLogin', {
        u_correo: correo,
        u_password: contraseña,
        recuerdame: recuerdame,
      }).then((response) => {
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setRol(response.data.role);
          if (recuerdame) {

          }
        } else {
          setMensajeError(response.data.message);
          setMostrarAlerta(true);
        }
      })
      .catch((error) => {
        setMensajeError('Error en la autenticación');
        setMostrarAlerta(true);
      });
  };

  useEffect(() => {
    if (rol === 1) {
      navigate('/admin');
    } else if (rol === 2) {
      navigate('/perfilUsuario');
    } else if (rol === 3) {
      navigate('/');
    } else if (rol === 4) {
      navigate('/');
    } else if (rol === 5) {
      navigate('/');
    }
  }, [rol, navigate]);

  const validarCorreo = (correo) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(correo);
  };

  const cerrarAlerta = () => {
    setMostrarAlerta(false);
    setMensajeError('');
    setErrorCorreo(false);
    setErrorContraseña(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
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
            <form id="loginForm" onSubmit={authSesion}>
              <img src={Logo} height="150" alt="" className='img-center' />
              <h4 className="" style={{ marginBottom: '5px' }}>
                ¡Bienvenido!
              </h4>
              <p className="text-muted" style={{ marginBottom: '40px' }}>
                Inicia sesión para continuar en Mcv.
              </p>
              {mostrarAlerta && (
                <Alert severity="error" sx={{ marginTop: '30px' }} onClose={cerrarAlerta}>
                  {mensajeError || 'Tus credenciales son incorrectas.'}
                </Alert>
              )}
              <br />
              <div className="login">
                <FormControl fullWidth={true} sx={{ marginBottom: 3 }}>
                  <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    error={errorCorreo}
                  />
                </FormControl>

                <FormControl fullWidth={true} sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    error={errorContraseña}
                  />
                </FormControl>
                <div className="form-check">
                  <Checkbox
                    color="secondary"
                    checked={recuerdame}
                    onChange={(e) => setRecuerdame(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="customControlInline">
                    Recuérdame
                  </label>
                </div>
                <input className="btn" type="submit" value="Iniciar Sesión" />
                <br />
                <div className="hover-link">
                  <Link
                    href="/Recuperar"
                    sx={{ marginBottom: 2, textDecoration: 'none', color: '#888' }}
                    className="link-2"
                  >
                    <i className="ri-lock-2-fill"></i> ¿Olvidaste tu contraseña?
                  </Link>
                  <Link href="/Registro" sx={{ textDecoration: 'none', color: '#888' }} className="link-1">
                    <i className="ri-bear-smile-fill"></i> ¿No tienes una cuenta? Regístrate aquí
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Grid>
  );
}

export default Login;
