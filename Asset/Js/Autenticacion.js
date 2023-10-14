$(document).ready(function () {
  $(".btnLogin").click(function (event) {
    event.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    $.ajax({
      type: "POST",
      url: "/login",
      data: { u_correo: email, u_password: password },
      xhrFields: {
        withCredentials: true,
      },
      success: function (response) {
        if (response.success) {
          if (response.role === 1) {
            window.location.href = "/agregarEmpleado";
          } else if (response.role === 2) {
            window.location.href = "/perfil";
          } else if (response.role === 3) {
            window.location.href = "/homeAuxiliar";
          } else if (response.role === 4) {
            window.location.href = "/homeVeterinario";
          } else if (response.role === 5) {
            window.location.href = "/homeGroomer";
          }
        } else {
          Swal.fire({
            icon: "error",
            text: response.message,
          });
        }
      },
      error: function (error) {
        console.error(error);
      },
    });
  });
});
