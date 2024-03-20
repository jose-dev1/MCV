
import axios from 'axios';
import dayjs from 'dayjs';


export const handleCrearPdf = async  (id) => {

    try {
    const result = await axios.get(`http://localhost:4321/carnet/datos-pdf/${id}`)
    const data = result.data

    const ventanaImpresion = window.open('', '_blank');
    const contenidoImpresion = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VacunaciÃģn</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css" integrity="sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
                width: 100%;
            }
    
            .container {
                display: flex;
                justify-content: space-around;
                margin-top: 50px;
                width: 100%;
            }
    
            .left {
                flex-basis: 50%;
            }
    
            .right {
                flex-basis: 40%;
                width: 400px;
                height: 450px;
                margin-left: 80px;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            table, th, td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
            }
    
            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
    
            .vaccine-card {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 70%;
                height: 100%;
                margin-left: 20px;
            }
    
            .vaccine-card h2 {
                margin-top: 0;
                color: #333;
                font-size: 1rem;
            }
    
            .vaccine-card p {
                margin: 10px 0;
                color: #555;
            }
    
            .vaccine-card strong {
                font-weight: bold;
            }
    
            .pet-image {
                max-width: 60%;
                display: block;
                margin: auto;
                padding: 20px;
            }

            .firma {
                width: 130px;
                height: 40px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="left">
                <table>
                    <tr>
                        <th>Vacuna Aplicada</th>
                        <th>Laboratorio</th>
                        <th>Lote Vacuna</th>
                        <th>Fecha Aplicacion</th>
                        <th>Firma</th>
                    </tr>

                    ${data.map((item, index) =>
        `   
                        <tr key=${index} >
                            <td>${item.nombre_vacuna} </td>
                            <td>${item.laboratorio}</td>
                            <td>${item.lote_vacuna_aplicada}</td>
                            <td> ${dayjs(item.fecha_vacuna_aplicada).format('YYYY-MM-DD')}</td>
                            <td>  <image src='/firma.png' class='firma' </td>
                        </tr>
                        `

    ).join('')}
    

                </table>
            </div>
            <div class="right">
                <div class="vaccine-card">
                <img class='pet-image' src='/mvc.png' alt='mvc' />
                    <h2>CARNET DE VACUNAS</h2>
                    <p><strong>Paciente:</strong> ${data[0].nombre_mascota} </p>
                    <p><strong>Especie:</strong>${data[0].tipo_mascota} </p>
                    <p><strong>Fecha de Nacimiento:</strong>${dayjs(data[0].fecha_nacimiento_mascota).format('YYYY-MM-DD')}</p>
                    <p><strong>Sexo:</strong> ${data[0].genero_mascota}</p>
                    <p><strong>Raza:</strong> ${data[0].raza_mascota} </p>
                    <p><strong>Propietario:</strong> ${data[0].nombre_cliente} </p>
                    <p><strong>Direccion:</strong> ${data[0].direccion_cliente} </p>
                    <p><strong>Telefono</strong> ${data[0].telefono_cliente} </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    ventanaImpresion.document.write(contenidoImpresion);
    setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
    }, 60)
        
    } catch (error) {
        console.log(error)
        
    }

    

};