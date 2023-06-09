// tomado de menus nesesarios para animaciones
const sideMenu = document.querySelector(".Menu");
const menuBtn = document.querySelector("#menuBtn");
const themeToggler = document.querySelector("#modoOscuro")
const nad = document.querySelector("#nadVar")

// funcion para reconocer click en cualqueir parte de la pantalla para el cerrado de la barra
document.addEventListener("click", function (event) {
    var targetElement = event.target; 
    var isClickOnButton = targetElement === menuBtn || menuBtn.contains(targetElement);
    var isClickOnMenu = targetElement === sideMenu || sideMenu.contains(targetElement);

    if (isClickOnButton) {
        openNav();
    } else {
        if (!isClickOnMenu) {
            closeNav();
        }
    }
});

// funcion nesesaria para cerrar el menu

function closeNav() {
    sideMenu.classList.remove('Mostrar');
    sideMenu.classList.add('Ocultar');
    sideMenu.style.boxShadow= 'none';
    setTimeout(function() {
        sideMenu.style.display = 'none';
      }, 500);  
}

// funcion nesesaria para abrir el menu

function openNav() {
    sideMenu.classList.remove('Ocltar');
    sideMenu.classList.add('Mostrar');
    sideMenu.style.display = 'block';
    sideMenu.style.boxShadow= '0 0 0 500vmax rgba(0, 0, 0, .5)';
}

//  funcion para el cmabio al tema oscuro

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('DarkThemeVariables');
    nad.classList.toggle('DarkDropdown');
})










