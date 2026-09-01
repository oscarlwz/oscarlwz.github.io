/* Interactive behavior only. Website text and links are in index.html. */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const publications = [...document.querySelectorAll(".publication-item")];
const loadMoreButton = document.querySelector(".load-more");
const initialCount = 8;
let activeFilter = "All";
let showAll = false;

function matchesFilter(publication, filter) {
  if (filter === "All") return true;
  if (filter === "Lead-author") return publication.dataset.lead === "true";
  return publication.dataset.tags.split(",").map((tag) => tag.trim()).includes(filter);
}

function updatePublications() {
  const matches = publications.filter((publication) => matchesFilter(publication, activeFilter));

  publications.forEach((publication) => publication.classList.add("is-hidden"));
  (showAll ? matches : matches.slice(0, initialCount)).forEach((publication) => publication.classList.remove("is-hidden"));

  loadMoreButton.hidden = matches.length <= initialCount;
  loadMoreButton.innerHTML = showAll
    ? "Show fewer <span aria-hidden=\"true\">↑</span>"
    : "Show all publications <span aria-hidden=\"true\">↓</span>";
}

function chooseFilter(filter) {
  activeFilter = filter;
  showAll = false;
  filterButtons.forEach((button) => button.classList.toggle("active", button.dataset.filter === filter));
  updatePublications();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => chooseFilter(button.dataset.filter));
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    chooseFilter(link.dataset.filterLink);
    showAll = true;
    updatePublications();
  });
});

loadMoreButton.addEventListener("click", () => {
  showAll = !showAll;
  updatePublications();
});

updatePublications();
