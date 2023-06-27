const registrar = document.getElementById('btnRegistrar');
const desactivar = document.querySelectorAll('#btnDesactivar');
const activModal = document.getElementById('btnActuaModal');
const calcelModal = document.getElementById('btnCancModal');

registrar.addEventListener("click",()=>{
    Swal.fire(
  'Registro exitoso',
  '',
  'success'
)
})

desactivar.forEach(boton => {
  boton.addEventListener('click',()=>{
      Swal.fire({
          title: 'Quiere desactivar a este trabajador?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Desactivado', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('No se desactivo', '', 'info')
          }
        })
  })
});


$(document).ready(function () {
  $('#tablaEmpleados').DataTable({ 
      language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
      },
  });
});


activModal.addEventListener("click",()=>{
  Swal.fire(
'Actualizacion Exitosa',
'',
'success'
)
})

calcelModal.addEventListener("click",()=>{
  Swal.fire(
'No se actualizo',
'',
'error'
)
})