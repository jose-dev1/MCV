const btnsSi = document.querySelectorAll("#si")
const btnsNo = document.querySelectorAll("#no")


btnsSi.forEach(button =>{
    button.addEventListener("click",()=> {
        Swal.fire(
            'Asistencia confirmada',
            '',
            'success'
          )

    });
})


btnsNo.forEach(button =>{
    button.addEventListener("click",()=> {
        Swal.fire(
            'Inasistencia confirmada ',
            '',
            'error'
          )

    });
})
