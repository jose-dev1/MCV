const open = document.getElementById("btn");
const modal = document.getElementById("modal");
const close = document.getElementById("close");



open.addEventListener("click",()=> {

  Swal.fire({
    title: 'No te robes mi codigo mama pinga.',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/Img/gato/cute-cat.gif")
      left top
      no-repeat
    `
  })
});

