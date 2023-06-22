const btnsdeClinar = document.querySelectorAll("#sweet-btn")

btnsdeClinar.forEach(button =>{

    button.addEventListener("click",()=> {
        Swal.fire({
            title: '¿Quiere Terminar El Servicio?',
            showDenyButton: true,
            confirmButtonText: 'Terminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Se Notifico al Cliente', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Cancelado', '', 'info')
            }
          })
    });
})

$(document).ready(function () {
  $('#tableServiciosA').DataTable({ 
      language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
      },
  });
});