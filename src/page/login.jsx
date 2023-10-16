import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Logo from "../assets/img/MVC.png"
import { FormControl } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import 'remixicon/fonts/remixicon.css'
import { Navigate } from 'react-router-dom';
import '../assets/css/login.css';

class Login extends Component {
    constructor() {
      super();
      this.state = {
        email: '',
        password: '',
        role: '',
        error: null,
      };
    }
  
    authsesion = (e) => {
      e.preventDefault();
  
      const { email, password } = this.state;
      fetch('http//localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Autenticación fallida');
        }
      })
      .then(data => {
        if (data.authenticated) {
          this.setState({ role: data.role }); 
        } else {
          this.setState({ error: 'Sus credenciales incorrectas' });
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
    }
  render() {
    if (this.state.role === '1') {
        return <Navigate to="/" />;

      } else if (this.state.role === '2') {
        return <Navigate to="/" />;

      } else if (this.state.role === '3') {
        return <Navigate to="/" />;

      } else if (this.state.role === '4') {
        return <Navigate to="/" />;

      } else if (this.state.role === '5'){
        return <Navigate to="/" />
      }
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
              <form id="loginForm" onSubmit={this.authsesion}>
                <img src={Logo} height="150" alt="" />
                <h4 className="" style={{ marginBottom: '5px' }}>Bienvenido !</h4>
                <p className="text-muted"style={{ marginBottom: '60px' }}>Inicia sesion para continuar en Mcv.</p>
                <div className="login">
                  <FormControl fullWidth={true} sx={{marginBottom:4}}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                     
                    />
                  </FormControl>
                  <FormControl fullWidth={true} sx={{marginBottom:2}}>
                    <TextField
                      label="Contraseña"
                      variant="outlined"
                      fullWidth
                      type="password"
                      value={this.state.password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                      
                    />
                  </FormControl>
                  <div className="form-check">
                    <Checkbox color="secondary" />
                    <label className="form-check-label" htmlFor="customControlInline">Recuerdame</label>
                  </div>
                  <input
                    className='btn'
                    type="submit"
                    value=" Login"
                  /><br/>
                  <div className='hover-link'>
                    <Link href="/Recuperar" sx={{ marginBottom: 2, textDecoration: "none", color: '#888'}} className='link-2' ><i class="ri-lock-2-fill"></i> Olvidó su contraseña?</Link>
                    <Link href="/register" sx={{ textDecoration: "none", color: '#888'}} className='link-1'><i class="ri-bear-smile-fill"></i> No tiene cuenta? , Registrese aqui</Link>
                  </div>  
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Grid>
    );
  }
}

export default Login;
