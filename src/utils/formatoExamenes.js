import dayjs from 'dayjs';

// Este es el export de generar pdf de certificado 
export const handleExamenesPdf = async  (img,tipo_examen,values,dataMascota) => {
    try {
    const ventanaImpresion = window.open('', '_blank');

    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = () => {
      const imagenDataUrl = reader.result
     
    const contenidoImpresion = `
    <!DOCTYPE html>                  
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Examenes ${dataMascota.nombre_mascota}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
                    /* Estilos para el header */
            .header{
                display: flex;
                background-color: #e6e2e2;
                align-items: center;
            }
            .img-header{
                width: 100%;
                display: flex;
                justify-content: end;
            }
            .header img{
                display: block;
                margin: auto;
                margin-left: 300px;
            }
        </div>
            .title{
                margin-left: 30px;
            }
    
                            /* Estilos para el header */
            .container {
                width: 800px;
                margin: 0 auto;
    ;
            }
    
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .header h1 {
                margin: 0;
                font-size: 20px;
            }
    
            .titulo-prueba p {
                margin: 0px 0;
                font-style: italic;
                background-color: #ccc;
                text-align: center;
            }
    
            .header img {
                width: 100px;
                margin-top: 10px;
            }
    
            .interpretation,
            .result {
                margin-top: 5px;
                margin-left: 15%;
            }
    
            .interpretation h2,
            .result h2 {
                text-align: center;
            }
    
            .interpretation img,
            .result img {
                width: 100%;
                height: 60%;
                display: block;
                margin: 0 auto 10px;
            }
    
            .interpretation label,
            .result label {
                display: block;
                text-align: center;
                margin-bottom: 5px;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 5px;
                font-size: 13px;
                height: 50px;
            }
    
            table, th, td {
                border: 1px solid #ccc;
            }
    
            th, td {
                padding: 2px;
                text-align: left;
            }
    
            .form-content th {
                background-color: #f0f0f0;
            }
    
            .form-content td {
                background-color: #fff;
            }
    
            .form-content tr:nth-child(even) td {
                background-color: #f9f9f9;
            }
    
            .form-content tr:last-child td {
                border-bottom: none;
            }
    
            .signature {
                text-align: center;
            }
    
            .todo_img{
                display: flex;
            }
            /* Estilos para el footer */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            /* Estilos generales */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f8f8f8;
            }
    
            /* Estilos para el footer */
            .footer {
        background-color: #ccc;
        color: #000;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        flex-wrap: wrap; /* Agregamos esto para manejar el ajuste de contenido en dispositivos pequeños */
    }
    
    .contact-info,
    .social-links {
        flex: 1; /* Distribuir el espacio disponible igualmente entre ambos elementos */
        margin-right: 10px; /* Espaciado entre elementos */
    }
    
    .social-links p {
        margin-bottom: 5px; /* Espaciado entre elementos */
    }
    
    .social-links img {
        width: 5%;
        margin-right: 5px; /* Espaciado entre elementos */
    }
    .firmaImagen {
      width: 250px;
      height: 50px;
  }
    
        
    
                    /* Estilos para el footer */
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header" >
                <div class="title">
                <h1>MI CAN VETERINARIA</h1>
                  <div class="contact-info">
                      <p>NIT: 1070603840-4</p>
                      <p>DIAGONAL 80 A # 86 50 LOCAL 2</p>
                      <p>MICAN.VETCARE@GMAIL.COM</p>
                  </div>
                </div>
    
                <div class="img_header">
                    <img src="/mvc.png" alt="Imagen Veterinaria">
                </div>
    
            </header>
            <div class="titulo-prueba">
            ${tipo_examen === 'Test CPV' ? `<p>TEST DE PRUEBA RAPIDA PARA DETECCION DE ANTIGENOS DE PARVOVIRUS </p>` : ''}
            ${tipo_examen === 'Test VIF-VILEF' ? `<p>ENSAYO DE INMUNOCROMATOGRAFÍA DETECCIÓN SIMULTÁNEA DEL
            ANTICUERPO DEL SIDA FELINO Y DEL ANTÍGENO DE LA LEUCEMIA
            FELINA</p>` : ''}
            ${tipo_examen === 'Test CDV' ? `<p>TEST DE PRUEBA RAPIDA PARA DETECCION DE ANTIGENOS DE
            DISTEMPER CANINO</p>` : ''}
            </div>
            <table class="form-content">
                <tr>
                    <th>Fecha</th>
                    <td>${dayjs(values.fecha_registro_resultados_examen).format('DD-MM-YYYY')}</td>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <td>${dataMascota.nombre_mascota}</td>
                </tr>
                <tr>
                    <th>Especie</th>
                    <td>${dataMascota.tipo_mascota}</td>
                </tr>
                <tr>
                    <th>Raza</th>
                    <td>${dataMascota.raza_mascota}</td>
                </tr>
                <tr>
                    <th>Sexo</th>
                    <td>${dataMascota.genero_mascota}</td>
                </tr>
                <tr>
                    <th>Fecha nacimiento</th>
                    <td>${dayjs(dataMascota.fecha_nacimiento_mascota).format('DD-MM-YYYY')}</td>
                </tr>
                <tr>
                    <th>Propietario</th>
                    <td>${dataMascota.nombre_propieario}</td>
                </tr>
            </table>
    
    
            <table class="form-content">
                <tr>
                    <th>Lote</th>
                    <td>${values.lote}</td>
                </tr>
                <tr>
                    <th>Fecha expiracion</th>
                    <td>${dayjs(values.fechaVencimiento).format('DD-MM-YYYY')}</td>
                </tr>
            </table>
            <div class="todo_img">
                <div class="interpretation">
                    <h2>Interpretación</h2>
                    ${tipo_examen === 'Test CPV' ? `<img src="/Test_CPV.jpeg" alt="Imagen de Interpretación">` : ''}
                    ${tipo_examen === 'Test VIF-VILEF' ? `<img src="/Test_VIF-VILEF.jpeg" alt="Imagen de Interpretación">` : ''}
                    ${tipo_examen === 'Test CDV' ? `<img src="/Test_CDV.jpeg" alt="Imagen de Interpretación">` : ''}
                </div>
                <div class="result">
                    <h2>Resultado</h2>
                    <img src="${imagenDataUrl}" alt="Imagen de Resultado">
                </div>
            </div>    
    
            <div class="resultado">
            ${tipo_examen === 'Test CPV' ? `<table class="form-content">
              <tr>
                  <th>Resultado</th>
                  <td>${values.resultadoCpv}</td>
              </tr>
            </table>` : ''}
          ${tipo_examen === 'Test VIF-VILEF' ? `<table class="form-content">
            <tr>
              <th>Resultado FIV </th>
              <td>${values.resultadoFiv}</td>
            </tr>
            <tr>
              <th>Resultado FELV</th>
              <td>${values.resultadoFelv}</td>
            </tr>
            </table>` : ''}
            ${tipo_examen === 'Test CDV' ? `<table class="form-content">
            <tr>
                <th>Resultado</th>
                <td>${values.resultadoCdv}</td>
            </tr>
            </table>` : ''}
            </div>
            <div class="signature">
                <p>Firma y Sello Médico: </p>
                <image src='/firma.png' class='firmaImagen'/>
                <div class="line">
                    _________________________
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
    }
    } catch (error) {
        console.log(error)
    }
};

