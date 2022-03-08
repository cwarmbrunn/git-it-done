var issueContainerEl = document.querySelector("#issues-container");

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }
  for (var i = 0; i < issues.length; i++) {
    // Create a link element that takes users to the issue on GitHub
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    issueContainerEl.appendChild(issueEl);

    // Create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // Append to container
    issueEl.appendChild(titleEl);

    // Create a type element
    var typeEl = document.createElement("span");

    // Check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // Append to container
    issueEl.appendChild(typeEl);
  }
};

var getRepoIssues = function (repo) {
  console.log(repo);

  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    // Request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

getRepoIssues("facebook/react");
