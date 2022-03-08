var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();
  // Get the value from the input element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    // Format Repo Name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // Create a Container for each repo

    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // Create a span element to hold repository name

    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // Append to container
    repoEl.appendChild(titleEl);

    // Create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // Check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class= 'fas fa-check-square status-icon icon-success'><i>";
    }
    // Append to Container
    repoEl.appendChild(statusEl);

    // Append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};
var getUserRepos = function (user) {
  // Format the GitHub API URL

  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // Make a request to the URL
  fetch(apiUrl)
    .then(function (response) {
      // Request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found!");
      }
    })
    .catch(function(error) {
      alert("Unable to connect to GitHub");
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);
