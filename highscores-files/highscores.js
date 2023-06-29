var score = localStorage.getItem("score");
var initials = localStorage.getItem("initials");

var scoresList = document.getElementById("scores-list");

var listItem = document.createElement("li");
listItem.textContent = `${initials}: ${score}`;

scoresList.appendChild(listItem);
