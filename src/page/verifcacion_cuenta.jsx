import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerificarCuenta = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codigoVerificacion = urlParams.get('codigo_verificacion');

        axios
            .post('http://localhost:4321/registro/verificar_cuenta', { codigo_verificacion: codigoVerificacion })
            .then((response) => {
                console.log(response.data);
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
        <div>
            <h1>Verificación de Cuenta</h1>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default VerificarCuenta;
