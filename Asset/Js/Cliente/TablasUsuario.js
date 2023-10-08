$(document).ready(function () {
    $('#tableCertificado').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
    $('#tableExamen').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
    $('#tablaTipoCertificado').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
    
    $('#tablaFactura').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
   
});

function progres() {
    let timerInterval
     Swal.fire({
     title: 'Este archivo se descargara en pdf',
     html: 'Descargando en 2 segundos',
     timer: 2000,
     timerProgressBar: true,
     didOpen: () => {
       Swal.showLoading()
       const b = Swal.getHtmlContainer().querySelector('b')
       timerInterval = setInterval(() => {
         b.textContent = Swal.getTimerLeft()
       }, 100)
     },
     willClose: () => {
       clearInterval(timerInterval)
     }
   }).then((result) => {
     
     if (result.dismiss === Swal.DismissReason.timer) {
       console.log('I was closed by the timer')
     }
   })
   }