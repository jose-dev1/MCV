var usuarios = [
    { id: 1, correo: 'veterinario@mcv.com', contraseña: '1234' },
    { id: 2, correo: 'groomer@mcv.com', contraseña: '12345' },
    { id: 3, correo: 'cliente@mcv.com', contraseña: '123456' },
    { id: 4, correo: 'aux@mcv.com', contraseña: '1234567' },
    { id: 5, correo: 'admin@mcv.com', contraseña: 'root' }
    
  ];
  
function autenticar(event) {
    event.preventDefault();
  
    var correoInput = document.getElementById('email');
    var contraseñaInput = document.getElementById('password');
  
    if (correoInput && contraseñaInput) {
      var correo = correoInput.value;
      var contraseña = contraseñaInput.value;
      var usuario = usuarios.find(function(u) {
        return u.correo === correo && u.contraseña === contraseña;
      });
  
      if (usuario) {
        switch (usuario.id) {
          case 1:
            window.location.href = '/Html/DashBoard/Veterinario/Inicio.html';
            break;
          case 2:
            window.location.href = '/Html/DashBoard/groomer/Inicio.html';
            break;
          case 3:
            window.location.href = '/Html/Cliente/P.usuario.html';
            break;
          case 4:
            window.location.href = '/Html/DashBoard/auxiliar/Inicio.html';
            break;
          case 5:
            window.location.href = '/Html/DashBoard/Administrador/AgregarEmpleado.html';
            break;
              
        }
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciales Incorrectas!',
          })
      }
    }
  }
  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', autenticar);
  } else {
    console.error("No se encontró el formulario de inicio de sesión.");
  }