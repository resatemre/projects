const titleInput = document.getElementById("title");
const directorInput = document.getElementById("director");
const urlInput = document.getElementById("url");
const filmForm = document.getElementById("film-form");

const ui = new UI();
const storage = new Storage();

eventListener();
function eventListener() {
  filmForm.addEventListener("submit", submitInfo);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });
}

function submitInfo(e) {
  const title = titleInput.value;
  const director = directorInput.value;
  const url = urlInput.value;

  if (title === "" || director === "" || url === "") {
    console.log("error");
  } else {
    const newFilm = new Films(title, director, url);
    ui.addFilmsToUI(newFilm);
    storage.addFilmToStorage(newFilm);
  }
  e.preventDefault();
}

/*

*/
