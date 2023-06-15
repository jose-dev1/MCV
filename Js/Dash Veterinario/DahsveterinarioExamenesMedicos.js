const eliminarDatos = document.querySelectorAll("#borrarDatos");
const registrar = document.getElementById('btnRegistrar')

function mostrarAlerta(){
    const selectModal = document.getElementById('floatingSelect');
    const opcionSelec = selectModal.options[selectModal.selectedIndex].value;
    
    if (opcionSelec === '1'){
        $('#myModal').modal('show');
    }else if (opcionSelec === '2'){
        $('#FIVAB_FeLV').modal('show');
    }else if (opcionSelec === '3'){
        $('#CDVAgTest').modal('show');
    }
}

eliminarDatos.forEach(botones => {
    botones.addEventListener("click",()=>{
        Swal.fire({
            title: 'Quiere eliminar el examen de esta mascota?',
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Canselar`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Eliminado', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Cancelado ', '', 'info')
            }
          });
    });
});

registrar.addEventListener('click', ()=>{
    Swal.fire(
        'Registrado!',
        'Se a registrado correctamente!',
        'success'
      )
})