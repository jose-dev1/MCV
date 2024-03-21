
import axios from 'axios';
import dayjs from 'dayjs';

// Este es el export de generar pdf de certificado 

export const handleCertificadoPdf = async  (data) => {
    try {
    const ventanaImpresion = window.open('', '_blank');
    const contenidoImpresion = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario</title>
        <style>
            /* Estilos CSS para el formulario */
            body {
                font-family: Arial, sans-serif;
                background-color: #f3f3f3;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 100%;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                text-align: center;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                padding-bottom: 20px;
            }
            th, td {
                padding: 5px;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
            p {
                margin-bottom: 10px;
            }
            .contact-info {
                display: flex;
            }
    
            .info{
                background-color: #ddd;
                height: 180px;
                padding: 10px;
                margin-top: 20px;
            }
    
            .firma{
                margin-left: auto;
            }
    
    
            .cabecera{
                display: flex;
            }
    
            .cabecera_img img{
                width: 90%;
            }
    
            .info-vet{
                margin-left: 40%;
                margin-top: 3%;
            }
    
            .todo_form {
                display: flex;
                justify-content: center;
                width: 100%;
            }
            .firmaImagen {
              width: 250px;
              height: 50px;
          }
        </style>
    </head>
    <body>
        <div class="todo_form">
            <div class="container">
    
                <div class="cabecera">
                    <div class="cabecera_img">
                        <img src="/mvc.png" alt="">
                    </div>
        
        
                    <div class="info-vet">
                        <p>DR. EDWIN A. VACA B.
                            MÈDICO VETERINARIO ZOOTECNISTA
                            MATRICULA PROFESIONAL COMVEZCOL 39121 </p>
                    </div>
                </div>
                <h2>CERTIFICADO DE SALUD DE CANINOS Y FELINOS</h2>
                <h3>1. Identificación del Propietario</h3>
                <table>
                  <tr>
                      <th colspan="4">NOMBRE COMPLETO: ${data.nombre_completo}</th>
                  </tr>
                </table>
                <table>
                  <tr>
                      <td>Tipo Documento: ${data.descripcion_documento}</td>
                      <td>Numero Documento: ${data.numero_documento_cliente}</td>
                      <td>Lugar Expedicion: ${data.lugar_expedicion_documento}</td>
                  </tr>
                </table>
                <table>
                  <tr>
                      <td>Direccion: ${data.direccion_cliente}</td>
                      <td>Telefono: ${data.telefono_cliente}</td>
                      <td>Ciudad: Bogotá</td>
                  </tr>
                </table>
                <h3>2. Identificación del Animal</h3>
                  <table>
                    <tr>
                        <th>NOMBRE:</th>
                        <td>${data.nombre_mascota}</td>
                        <th>FECHA DE NACIMIENTO:</th>
                        <td>${dayjs(data.fecha_nacimiento_mascota).format('DD-MM-YYYY')}</td>
                        <th>PESO:</th>
                        <td>${data.peso_mascota}</td>
                    </tr>
                    <tr>
                        <th>ESPECIE:</th>
                        <td>${data.tipo_mascota}</td>
                        <th>SEXO:</th>
                        <td>${data.id_genero_mascota}</td>
                        <th>TAMAÑO:</th>
                        <td>${data.tamanno_mascota}</td>
                    </tr>
                    <tr>
                        <th>RAZA:</th>
                        <td>${data.raza_mascota}</td>
                        <th>COLOR PELAJE:</th>
                        <td>${data.color_mascota}</td>
                        <th>MICRO CHIP:</th>
                        <td>${data.microchip_mascota=== 1 ? 'Si' : 'No'}</td>
                    </tr>
                  </table>
                <h3>3. Información Vacunas</h3>
                ${data.vacunasAplicadas.map((item, index) =>
                  `<table key=${index}>
                      <tr>
                        <th>LABORATORIO:</th>
                        <td>${item.laboratorio}</td>
                        <th>NOMBRE COMERCIAL:</th>
                        <td>${item.nombre_vacuna}</td>
                      </tr>
                    </table>
                    <table key=${index}>
                      <tr>
                          <th>F. DE APLICACIÓN:</th>
                          <td>${dayjs(item.fecha_vacuna_aplicada).format('DD-MM-YYYY')}</td>
                          <th>FECHA DE VENCIMIENTO:</th>
                          <td>${dayjs(item.fecha_vencimiento_vacuna_aplicada).format('DD-MM-YYYY')}</td>
                          <th>LOTE:</th>
                          <td>${item.lote_vacuna_aplicada}</td>
                      </tr>
                  </table>
                  <br>`).join('')}
                <p>PARA VIAJES A LA UNION EUROPEA ES NECESARIO ANEXAR ESTUDIO SEROLÓGICO DE TITULACIÓN ANTIRRÁBICA CONFORME A LA LEGISLACIÓN VIGENTE.</p>
                <h3>4. Información Antiparasitarios Interno y Externo</h3>
                <h3>ANTIPARASITARIO INTERNO</h2>
                <table>
                  <tr>
                      <th>LABORATORIO:</th>
                      <td>${data.desparacitacionesInternas.laboratorio_desparacitacion}</td>
                      <th>NOMBRE COMERCIAL:</th>
                      <td>${data.desparacitacionesInternas.medicamento_aplicado}</td>
                  </tr>
                  </table>
                  <table>
                  <tr>
                      <th>F. DE APLICACIÓN</th>
                      <td>${dayjs(data.desparacitacionesInternas.fecha_aplicacion_desparacitacion).format('DD-MM-YYYY')}</td>
                      <th>F. DE VTO</th>
                      <td>${dayjs(data.desparacitacionesInternas.fecha_vencimiento_desparacitacion).format('DD-MM-YYYY')}</td>
                      <th>LOTE</th>
                      <td>${data.desparacitacionesInternas.lote_desparacitacion}</td>
                      <th>R. ICA</th>
                      <td>${data.desparacitacionesInternas.registro_ica}</td>
                  </tr>
                </table>
                <h3>ANTIPARASITARIO EXTERNO</h2>
                <table>
                    <tr>
                        <th>LABORATORIO:</th>
                        <td>${data.desparacitacionesExternas.laboratorio_desparacitacion}</td>
                        <th>NOMBRE COMERCIAL:</th>
                        <td>${data.desparacitacionesExternas.medicamento_aplicado}</td>
                    </tr>
                    </table>
                    <table>
                    <tr>
                        <th>F. DE APLICACIÓN:</th>
                        <td>${dayjs(data.desparacitacionesExternas.fecha_aplicacion_desparacitacion).format('DD-MM-YYYY')}</td>
                        <th>F. DE VTO</th>
                        <td>${dayjs(data.desparacitacionesExternas.fecha_vencimiento_desparacitacion).format('DD-MM-YYYY')}</td>
                        <th>LOTE</th>
                        <td>${data.desparacitacionesExternas.lote_desparacitacion}</td>
                        <th>R. ICA</th>
                        <td>${data.desparacitacionesExternas.registro_ica}</td>
                    </tr>
                </table>
                <p>APLICADOS  DENTRO  DE LOS 15 (QUINCE) DIAS ANTERIORES A LA FECHA  DE VIAJE DE LA MASCOTA Y CONFORME A LA LEGISLACIÒN VIGENTE. </p>
               <div class="info">
                  <h3>5. Información Sanitaria</h3>
                  <p>${data.informacionSanitaria}</p>
               </div>
                <div class="info">
                  <h3>6. Información Adicional</h3>
                  <p>${data.informacionAdicional}</p>
                </div>
                <div class="contact-info">
                    <p>3138116472 - 3132350068<br>BOGOTÁ-COLOMBIA<br>FECHA:${dayjs().format('DD-MM-YYYY')} <br>TELEFONO:5229100<br>MICAN.VETCARE@GMAIL.COM<br>DIAGONAL 80 A #86-50 LOCAL 2</p>
                    <div class="firma">
                        <p>FIRMA Y SELLO</p>
                        <image src='/firma.png' class='firmaImagen'/>
                        <p>______________________________</p>
                    </div>
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


export const handleCertificadoGeneralPdf = async (id) => {
    try {
        const response = await axios.get(`http://localhost:4321/certificados/oneById/${id}`)
        handleCertificadoPdf(response.data)
    } catch (error) {
        console.log(error)
    }
  }