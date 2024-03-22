import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const VerificarCuenta = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codigoVerificacion = urlParams.get('codigo_verificacion');

        axios
            .post('http://localhost:4321/registro/verificar_cuenta', { codigo_verificacion: codigoVerificacion })
            .then((response) => {
                console.log(response.data);
                setVerificationSuccess(true);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Error interno del servidor');
                }
            });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            {verificationSuccess ? (
                <>
                    <FaCheckCircle style={{ color: 'green', fontSize: '74px', marginBottom: '40px' }} />
                    <p>¡Cuenta verificada con éxito!</p>
                    <Link to="/login">Puede iniciar sesión</Link>
                </>
            ) : (
                <>
                    <FaTimesCircle style={{ color: 'red', fontSize: '64px', marginBottom: '20px' }} />
                    {errorMessage ? <p>{errorMessage}</p> : <p>El código ya ha sido utilizado.</p>}
                </>
            )}
        </div>
    );
};

export default VerificarCuenta;
