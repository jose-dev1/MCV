const agendar = document.getElementById("btnagendar");


agendar.addEventListener("click",()=>{
    Swal.fire({
        title: 'Esta seguro que quiere agendar una cita',
        text: "El dia ## a la hora##",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Agendar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Agendada',
            'Tu cita fue agendada con exito ',
            'success'
          )
        }
      })
})

