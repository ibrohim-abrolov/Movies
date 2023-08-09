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
        imgElement.setAttribute("url", item.ImageUrl);
        imgElement.width = "200";
        imgElement.height = "200";
        let headingElement = document.createElement("h1");
        let wrapper1Element = document.createElement("div");
        let fullTitleElement = document.createElement("p");
        let yearElement = document.createElement("time");
        let textboxElement = document.createElement("div");
        let summaryElement = document.createElement("p");
        let wrapper3Element = document.createElement("div");
        let ratingElement = document.createElement("strong");
        let runtimeElement = document.createElement("time");
        let langElement = document.createElement("p");


        // Add classlist
        liElement.classList.add("movies__items");
        imgElement.classList.add("movies__img");
        headingElement.classList.add("movies__heading");
        wrapper1Element.classList.add("movies__wrapper");
        fullTitleElement.classList.add("movies__full-title");
        yearElement.classList.add("movies__year");
        textboxElement.classList.add("movies__textbox");
        summaryElement.classList.add("movies__summary");
        wrapper3Element.classList.add("movies__wrapper");
        ratingElement.classList.add("movies__rating");
        runtimeElement.classList.add("movies__runtime");
        langElement.classList.add("movies__lang");


        // Adding textContents
        headingElement.textContent = item.Title;
        fullTitleElement.textContent = item.fulltitle;
        yearElement.textContent = item.movie_year;
        summaryElement.textContent = item.summary;
        ratingElement.textContent = item.imdb_rating;
        runtimeElement.textContent = item.runtime;
        langElement.textContent = item.language;


        // Appending the elements
        liElement.append(imgElement, headingElement,  wrapper1Element, textboxElement, wrapper3Element, langElement);
        wrapper1Element.append(fullTitleElement, yearElement);
        textboxElement.append(summaryElement);
        wrapper3Element.append(ratingElement, runtimeElement);
        elList.appendChild(liElement);
    });
};
renderMovies(movies);

elSearch.addEventListener("keyup", function(evt) {
    evt.preventDefault();

    let searchValue = elSearch.value.trim().toLowerCase();

    let filtered = movies.filter(function(item) {
        let searchName = item.Title.toLowerCase();
        return searchName.includes(searchValue);
    });
    renderMovies(filtered);
});