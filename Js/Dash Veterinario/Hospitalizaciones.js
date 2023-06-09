const btnsTerminar = document.querySelectorAll("#terminar")
const btnRegistrar = document.querySelector("#registrar")


btnRegistrar.addEventListener("click",()=> {
    Swal.fire(
        'Hospitalización Registrada',
        '',
        'success'
      )
});


btnsTerminar.forEach(button =>{

    button.addEventListener("click",()=> {

        Swal.fire({
            title: '¿Desea cerrar el servicio?',
            icon: 'warning',
            showDenyButton:true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            denyButtonText:'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Servicio Terminado',
                '',
                'success'
              )
            }else if(result.isDenied){
                swal.fire('operacion cancelada','','error')
            }
          })
    });


})
