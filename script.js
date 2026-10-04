// Render publications from data/publications.json, grouped by type and newest first
const publications = document.getElementById("publications-list");
if (publications) {
  const typeOrder = ["journal_article", "conference_abstract", "preprint"];
  const labels = { conference_abstract: "(abstract)", preprint: "(preprint)" };
  fetch("data/publications.json?v=14")
    .then((response) => response.json())
    .then((results) => {
      results.sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type) || b.year - a.year);
      document.getElementById("publication-count").textContent = results.length;
      for (const publication of results) {
        const item = document.createElement("li");
        const title = document.createElement("i");
        title.textContent = publication.title;
        const link = document.createElement("a");
        link.href = `https://doi.org/${publication.doi}`;
        link.textContent = `${publication.venue}, ${publication.year}`;
        item.append(title, document.createElement("br"), link);
        if (labels[publication.type]) {
          const label = document.createElement("span");
          label.className = "label";
          label.textContent = labels[publication.type];
          item.append(" ", label);
        }
        publications.append(item);
      }
    });
}

// Render race results from data/races.json, newest first, showing hours and minutes only
const races = document.getElementById("races");
if (races) {
  fetch("data/races.json?v=14")
    .then((response) => response.json())
    .then((results) => {
      results.sort((a, b) => b.date.localeCompare(a.date));
      for (const race of results) {
        const date = new Date(`${race.date}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" });
        const time = race.time.split(":").slice(0, 2).join(":");
        const row = races.insertRow();
        for (const text of [date, `${race.name} ${race.distance}`, time, `${race.place} / ${race.finishers} (Top ${Math.round(race.percentile)}%)`]) {
          row.insertCell().textContent = text;
        }
      }
    });
}
