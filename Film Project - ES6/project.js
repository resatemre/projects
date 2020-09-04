const form = document.getElementById("film-form");
const titleELement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardBody = document.getElementsByClassName("card-body")[1];
const clear = document.getElementById("clear-films");

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
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
    UI.displayMassages("Fill all", "danger");
  } else {
    const newFilm = new Film(title, director, url);
    UI.addFilmToUI(newFilm); //arayuze film eklemek

    Storage.addFilmToStorage(newFilm);

    UI.displayMassages("adding is success", "success");
  }

  UI.clearInputs(titleELement, directorElement, urlElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    UI.displayMassages("delete is successful", "success");
  }
}

function clearAllFilms() {
  if (confirm("are you sure?")) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}
