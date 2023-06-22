function sucCita() {
    Swal.fire(
        'Buen trabajo!',
        'Se le notificara al cliente!',
        'success'
      )
}
$(document).ready(function () {
  $('#tblCitasAgenGroo').DataTable({ 
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
    },
  });
});