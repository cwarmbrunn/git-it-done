var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

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

        // Check if API has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

var displayWarning = function (repo) {
  // Add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // Append warning container
  limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");
