const eliminarDatos = document.querySelectorAll("#borrarDatos");
const registrar = document.getElementById('btnRegistrar')

function mostrarAlerta(){
    const selectModal = document.getElementById('selectTest');
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

registrar.addEventListener('click', ()=>{
    Swal.fire(
        'Registrado!',
        'Se a registrado correctamente!',
        'success'
      )
})

$(document).ready(function () {
  $('#tablaExamenesMedicos').DataTable({ 
      language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
      },
  });
});

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