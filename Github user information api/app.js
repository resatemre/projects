const githubNameInput = document.getElementById("githubname");
const githubFormSubmit = document.getElementById("github-form");
const clearAllUsers = document.getElementById("clear-last-users");
const github = new Github();
const ui = new UI();

eventListener();
function eventListener() {
  githubFormSubmit.addEventListener("submit", getUserData);
  clearAllUsers.addEventListener("click", clearSearch);
  document.addEventListener("DOMContentLoaded", getSearchData);
}

function getUserData(e) {
  let userName = githubNameInput.value.trim();

  if (userName === "") {
    alert("please type a name");
  } else {
    github
      .getGithubData(userName)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("Can not find user");
        } else {
          ui.addSearchedUserToUI(userName);

          Storage.addSearchedUserToStorage(userName);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repos);
        }
      })
      .catch((err) => ui.showError(err));
  }
  ui.clearInput();

  e.preventDefault();
}

function clearSearch() {
  if (confirm("are you sure?")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}

function getSearchData() {
  let users = Storage.getSearchUsersFromStorage();

  let result;
  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });

  ui.lastUsers.innerHTML = result;
}
