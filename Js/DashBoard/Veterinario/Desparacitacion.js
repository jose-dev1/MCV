$(document).ready(function () {
    $('#tablaDesparacitacion').DataTable({ 
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

function eliminar (){
    Swal.fire({
        title: 'Esta Seguro?',
        text: "Este cambio no sera reversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Su factura ha sido eliminada.',
            'success'
          )
        }
      })
}

function alerta () {
  Swal.fire(
      'Felicidades!',
      'Se informacion se ha guardado!',
      'success'
  );
}
