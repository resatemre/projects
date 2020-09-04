class Github {
  constructor() {
    this.url = "https://api.github.com/users/";
  }
  async getGithubData(userName) {
    let responseUser = await fetch(this.url + userName);
    let responseRepos = await fetch(this.url + userName + "/repos");

    let userData = await responseUser.json();
    let userRepos = await responseRepos.json();

    return {
      user: userData,
      repos: userRepos,
    };
  }
}
