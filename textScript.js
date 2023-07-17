var fadingText = document.getElementById("fadingText");
var texts = [
  "Welcome to the Professional Football Database",
  "We collect comprehensive statistics from players all around the world",
  "Select a league from our dropdown menu, then enter a players name in the search bar to see an in depth statistical analysis of last years campaigns."
];
var index = 0;

function fadeText() {
  fadingText.innerHTML = texts[index];
  index = (index + 1) % texts.length;
}

fadeText();
setInterval(function() {
  fadingText.classList.remove("fade-in-out");
  setTimeout(function() {
    fadeText();
    fadingText.classList.add("fade-in-out");
  }, 1000);
}, 10000);