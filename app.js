const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");

  closeAllSubMenus();
}

// function toggleSubMenu(button) {

//   if (!button.nextElementSibling.classList.contains('show')) {
//     closeAllSubMenus()
//   } '

//   button.nextElementSibling.classList.toggle('show')
//   button.classList.toggle('rotate')

//   if (sidebar.classList.contains('close')) {
//     sidebar.classList.toggle('close')
//     toggleButton.classList.toggle('rotate')
//   }
// }

function toggleSubMenu(button) {
  const submenu = button.nextElementSibling;
  // find the UL that contains this button (so you only touch its siblings)
  const parentUL = button.closest("ul");

  // close any other open sub-menu in this same UL
  parentUL.querySelectorAll(":scope > li > .sub-menu.show").forEach((ul) => {
    if (ul !== submenu) {
      ul.classList.remove("show");
      ul.previousElementSibling.classList.remove("rotate");
    }
  });

  // now toggle _this_ one
  submenu.classList.toggle("show");
  button.classList.toggle("rotate");

  // if sidebar was collapsed, force it open
  if (sidebar.classList.contains("close")) {
    sidebar.classList.remove("close");
    toggleButton.classList.remove("rotate");
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

const dash = document.getElementById("dashboard");

// Drag & Drop
const icons = document.querySelectorAll(".camera-icon");
const container = dash;
let streams = [];

icons.forEach((icon) => {
  icon.addEventListener("dragstart", (e) =>
    e.dataTransfer.setData("id", icon.dataset.id)
  );
});
container.addEventListener("dragover", (e) => {
  e.preventDefault();
  container.classList.add("dragover");
});
container.addEventListener("dragleave", () =>
  container.classList.remove("dragover")
);
container.addEventListener("drop", (e) => {
  e.preventDefault();
  container.classList.remove("dragover");
  const id = e.dataTransfer.getData("id");
  if (id && !streams.includes(id)) {
    streams.push(id);
    if (streams.length > 4) streams.shift();
    renderStreams();
  }
});

function renderStreams() {
  dash.innerHTML = "";
  const count = streams.length;
  const cols = Math.ceil(Math.sqrt(count)) || 1;
  dash.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  if (count === 0) {
    const hint = document.createElement("p");
    hint.style.gridColumn = "1/-1";
    hint.style.textAlign = "center";
    hint.style.color = "#8a8b95";
    hint.textContent = "Drag camera icons here";
    dash.appendChild(hint);
    return;
  }
  streams.forEach((id) => {
    const cell = document.createElement("div");
    cell.classList.add("stream");
    cell.setAttribute("data-id", id);
    dash.appendChild(cell);
  });
}
