import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/img/MVC.png';
import { FormControl } from '@mui/material';
import 'remixicon/fonts/remixicon.css';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import '../assets/css/login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState(false);
  const [userAuth, setuserAuth] = useState(false);
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

    axios.post('http://localhost:4321/login', {
      userCorreo: correo,
      userPassword: contraseña,
    }).then((response) => {
      if (response.data.success) {
        if (response.data.user.estado_verificacion_usuario === 0) {
          setMensajeError('Verifica tu correo para poder iniciar sesión');
          setMostrarAlerta(true);
        } else if (response.data.user.estado_usuario === 0) {
          setMensajeError('Tu cuenta está desactivada, contáctanos si necesitas alguna información');
          setMostrarAlerta(true);
        } else {
          if (response.data.user.id_tipo_usuario === 2) {
            const client = response.data.client;
            if (client && Object.keys(client).length !== 0) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
              localStorage.setItem('client', JSON.stringify(response.data.client));
              setuserAuth(true);
              navigate('/perfil-usuario');
            } else {
              localStorage.setItem('user', JSON.stringify(response.data.user));
              setuserAuth(true);
              navigate('/user-cliente');
            }
          } else {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('client', JSON.stringify(response.data.client));
            setuserAuth(true);
          }
        }
      } else {
        setMensajeError(response.data.message);
        setMostrarAlerta(true);
      }
    })
      .catch((error) => {
        setMensajeError('Correo o contraseña inválida');
        setMostrarAlerta(true);
      });

  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const userRoutes = {
        1: '/admin',
        2: '/perfil-usuario',
        3: '/inicio-auxiliar',
        4: '/veterinario',
        5: '/inicio-groomer',
      };

      const userRoute = userRoutes[user.id_tipo_usuario];

      if (userRoute) {
        navigate(userRoute);
      } else {
        console.warn('Tipo de usuario no reconocido:', user.id_tipo_usuario);
      }
    }
  }, [userAuth, navigate]);

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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '20px' }}>
      <Link to='/' className="ri-home-2-line" style={{ fontSize: '45px', marginRight: '10px', position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}></Link>
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
                  <input className="btn" type="submit" value="Iniciar Sesión" />
                  <br />
                  <div className="hover-link">
                    <Link
                      to="/recuperar-contraseña"
                      sx={{ marginBottom: 2, textDecoration: 'none', color: '#888' }}
                      className="link-2"
                    >
                      <i className="ri-lock-2-fill"></i> ¿Olvidaste tu contraseña?
                    </Link>
                    <Link to="/registro" sx={{ textDecoration: 'none', color: '#888' }} className="link-1">
                      <i className="ri-bear-smile-fill"></i> ¿No tienes una cuenta? Regístrate aquí
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Grid>
    </div>
  );
}

export default Login;
