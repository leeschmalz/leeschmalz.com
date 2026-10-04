// Keep the publication count in sync with the list
const count = document.getElementById("publication-count");
if (count) count.textContent = document.querySelectorAll("ul.publications li").length;

// Render race results from data/races.json, newest first, showing hours and minutes only
const races = document.getElementById("races");
if (races) {
  fetch("data/races.json?v=12")
    .then((response) => response.json())
    .then((results) => {
      results.sort((a, b) => b.date.localeCompare(a.date));
      for (const race of results) {
        const date = new Date(`${race.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        const time = race.time.split(":").slice(0, 2).join(":");
        const row = races.insertRow();
        for (const text of [date, `${race.name} ${race.distance}`, time, `${race.place} / ${race.finishers}`]) {
          row.insertCell().textContent = text;
        }
      }
    });
}
