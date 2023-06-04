// tomado de menus nesesarios para animaciones
const sideMenu = document.querySelector(".menu");
const menuBtn = document.querySelector("#menu-btn");
const themeToggler = document.querySelector("#modo-oscuro")

// funcion para reconocer click en cualqueir parte de la pantalla para el cerrado de la barra
document.addEventListener("click", function (event) {
    var targetElement = event.target; 
    var isClickOnButton = targetElement === menuBtn || menuBtn.contains(targetElement);
    var isClickOnMenu = targetElement === sideMenu || sideMenu.contains(targetElement);

    if (isClickOnButton) {
        opennav();
    } else {
        if (!isClickOnMenu) {
            closenav();
        }
    }
});

// funcion nesesaria para cerrar el menu

function closenav() {
    sideMenu.classList.remove('mostrar');
    sideMenu.classList.add('ocultar');
    sideMenu.style.boxShadow= 'none';
    setTimeout(function() {
        sideMenu.style.display = 'none';
      }, 500);  
}

// funcion nesesaria para abrir el menu

function opennav() {
    sideMenu.classList.remove('ocltar');
    sideMenu.classList.add('mostrar');
    sideMenu.style.display = 'block';
    sideMenu.style.boxShadow= '0 0 0 500vmax rgba(0, 0, 0, .5)';
}

//  funcion para el cmabio al tema oscuro

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
})










