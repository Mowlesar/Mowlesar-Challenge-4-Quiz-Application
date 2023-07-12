var savedScore = JSON.parse(localStorage.getItem)("savedScores") || [];

var scoresList = document.getElementById("scores-list");


savedScore.map((score) => {
    var listItem = document.createElement("li");
listItem.textContent = `${score.initials}: ${score.score}`;
scoresList.appendChild(listItem);
});
