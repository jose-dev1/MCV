const btnsTerminar = document.querySelectorAll("#terminar")
const btnRegistrar = document.querySelector("#registrar")
const btnsDescargar = document.querySelectorAll("#guardar")
const btnActualizar = document.querySelector("#actualizar")

btnRegistrar.addEventListener("click", () => {
  Swal.fire(
    'Hospitalización Registrada',
    '',
    'success'
  )
});


btnActualizar.addEventListener("click", () => {
  Swal.fire(
    'Actualizacion registrada',
    '',
    'success'
  )
});


btnsTerminar.forEach(button => {

  button.addEventListener("click", () => {

    Swal.fire({
      title: '¿Desea eliminar el servicio?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Servicio Eliminado',
          '',
          'success'
        )
      } else if (result.isDenied) {
        swal.fire('operacion cancelada', '', 'error')
      }
    })
  });


})


btnsDescargar.forEach(button => {

  button.addEventListener("click", () => {

    let timerInterval
    Swal.fire({
      title: 'Este archivo se descargara en pdf',
      html: 'Descargando en 2 segundos.',
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
    })
  });


})



