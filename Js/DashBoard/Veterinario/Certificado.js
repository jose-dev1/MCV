$(document).ready(function () {
    $('#tablaCertificado').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
});


function actualizarC(){
    Swal.fire({
        title: 'Esta seguro que desea actualizar?',
        text: "Esta actualizacion no sera reversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar cambios!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Guardando Cambios!',
            'Los datos han sido cambiados.',
            'success'
          )
        }
      })
}

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