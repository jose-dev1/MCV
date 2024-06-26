const eliminarDatos = document.querySelectorAll("#borrarDatos");


$(document).ready(function () {
  $('#tableServiciosA').DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
    },
  });
});



eliminarDatos.forEach(botones => {
  botones.addEventListener("click",()=>{
      Swal.fire({
          title: 'Quiere eliminar este servicio',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Eliminado', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Cancelado ', '', 'info')
          }
        });
  });
});
