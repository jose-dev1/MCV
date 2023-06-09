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