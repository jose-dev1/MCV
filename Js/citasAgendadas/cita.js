const open = document.getElementById("btn");
const modal = document.getElementById("modal");
const close = document.getElementById("close");

open.addEventListener("click",()=> {
    modal.classList.add("show");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
  
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.classList.remove("show");
    }
  });



close.addEventListener("click", () => {
      modal.classList.remove("show");
  });