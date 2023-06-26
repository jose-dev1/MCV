$(document).ready(function () {
    $('#tablaHistoria').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
});


function actualizar (){
    Swal.fire({
        title: 'Desea guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no se guardaron', '', 'info')
        }
      })
}

function alerta () {
    Swal.fire(
        'Felicidades!',
        'se ha guardado la historia clinica!',
        'success'
    );
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

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('.your_picture_image')
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

