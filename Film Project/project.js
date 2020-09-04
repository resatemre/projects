const form = document.getElementById("film-form");
const titleELement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardBody = document.getElementsByClassName("card-body")[1];
const clear = document.getElementById("clear-films");

const ui = new UI();

const storage = new Storage();

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });
  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleELement.value;
  const director = directorElement.value;
  const url = urlElement.value;
  e.preventDefault();
  if (title === "" || director === "" || url === "") {
    ui.displayMassages("Fill all", "danger");
  } else {
    const newFilm = new Film(title, director, url);
    ui.addFilmToUI(newFilm); //arayuze film eklemek

    storage.addFilmToStorage(newFilm);

    ui.displayMassages("adding is success", "success");
  }

  ui.clearInputs(titleELement, directorElement, urlElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    ui.displayMassages("delete is successful", "success");
  }
}

function clearAllFilms() {
  if (confirm("are you sure?")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
}
