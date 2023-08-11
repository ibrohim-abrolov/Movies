elForm = document.querySelector(".form");
elSearch = document.querySelector(".form__search");
elFrom = document.querySelector(".form__from");
elTo = document.querySelector(".form__to");
elList = document.querySelector(".movies__list");

function renderMovies(array) {
    elList.innerHTML = "";
    array.forEach(function(item, index, array) {

        // Creating the elements
        let liElement = document.createElement("li");
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", `https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg`);
        imgElement.setAttribute("alt", item.fulltitle);
        let headingElement = document.createElement("h1");
        let summaryElement = document.createElement("details");
        let fullTitleElement = document.createElement("p");
        let yearElement = document.createElement("p");
        let categoryElement = document.createElement("p");
        let langElement = document.createElement("p");
        let ratingElement = document.createElement("strong");
        let linkElement = document.createElement("a");


        // Add classlist
        liElement.classList.add("movies__items");
        imgElement.classList.add("movies__img");
        headingElement.classList.add("movies__heading");
        summaryElement.classList.add("movies__summary");
        fullTitleElement.classList.add("movies__full-title");
        yearElement.classList.add("movies__year");
        categoryElement.classList.add("movies__category");
        langElement.classList.add("movies__lang");
        ratingElement.classList.add("movies__rating");
        linkElement.classList.add("movies__link");


        // Adding textContents
        headingElement.textContent = item.Title;
        summaryElement.textContent = `Summary: ${item.summary}`;
        fullTitleElement.textContent = `Movie fulltitle: ${item.fulltitle}`;
        yearElement.textContent = `Movie year: ${item.movie_year}`;
        categoryElement.textContent = `Categories: ${item.Categories}`
        langElement.textContent = `Movie language: ${item.language}`;
        ratingElement.textContent = `Movie rating: ${item.imdb_rating}`;
        linkElement.textContent = "Watch movie";
        linkElement.setAttribute("target", "blank");
        linkElement.setAttribute("href", `https://www.imdb.com/title/${item.imdb_id}`);


        // Appending the elements
        liElement.append(imgElement, headingElement, summaryElement, fullTitleElement, yearElement, categoryElement, langElement, ratingElement, linkElement);
        elList.appendChild(liElement);
    });
};
renderMovies(movies);

let sliced = movies.slice(0, 100);

elSearch.addEventListener("keyup", function () {
    let searchValue = elSearch.value.trim().toLowerCase();

    let filtered = movies.filter(function(item) {
        let searchName = item.fulltitle.toLowerCase();
        return searchName.includes(searchValue);
    });
    renderMovies(filtered);
});

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    let elFromValue = elFrom.value;
    let elToValue = elTo.value;

    let result = movies.filter(function(item) {
        let year = elToValue >= item.movie_year && elFromValue <= item.movie_year;
        return year;
    });
    renderMovies(result);
});