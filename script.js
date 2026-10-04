// Keep the publication count in sync with the list
const count = document.getElementById("publication-count");
if (count) count.textContent = document.querySelectorAll("ul.publications li").length;
