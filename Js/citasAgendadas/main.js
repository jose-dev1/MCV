const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let currYear, currMonth, date;

const renderCalendar = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  

  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    const isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear();
    liTag += `<li class="${isToday ? "active" : ""}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

const handleIconClick = (event) => {
  currMonth += event.target.id === "prev" ? -1 : 1;
  if (currMonth < 0 || currMonth > 11) {
    date = new Date(currYear, currMonth, date.getDate());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    date = new Date();
  }
  renderCalendar();
};



const todayButton = document.getElementById("today-button");

const goToToday = () => {
  date = new Date();
  currYear = date.getFullYear();
  currMonth = date.getMonth();
  renderCalendar();
};

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();
renderCalendar();
prevNextIcon.forEach(icon => icon.addEventListener("click", handleIconClick));
todayButton.addEventListener("click", goToToday);
