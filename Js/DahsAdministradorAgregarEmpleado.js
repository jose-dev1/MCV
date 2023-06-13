const registrar = document.getElementById('btnRegistrar');
const desactivar = document.getElementById('btnDesactivar');

registrar.addEventListener("click",()=>{
    Swal.fire(
  'Registro exitoso',
  '',
  'success'
)
})

desactivar.addEventListener('click',()=>{
    Swal.fire({
        title: 'Quiere desactivar a este trabajador?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Canselar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Desactivado', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('No se desactivo', '', 'info')
        }
      })
})