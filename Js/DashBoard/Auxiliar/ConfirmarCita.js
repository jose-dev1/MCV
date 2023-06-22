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


$(document).ready(function () {
    $('#CitasT').DataTable({ 
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
    });
});