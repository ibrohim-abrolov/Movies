const elForm = document.querySelector(".form");
const elSearch = document.querySelector(".form__search");
const elFromInput = document.querySelector(".form__from");
const elToInput = document.querySelector(".form__to");
const elList = document.querySelector(".movies__list");
const elBookmarkList = document.querySelector(".bookmark-list");
const bookmarkArr = [];

const sliced_movie = movies.slice(0, 70);

function renderMovies(array, ulElement, remove) {
    ulElement.innerHTML = "";
    array.forEach(function(item) {
        
        // Creating the elements
        const liElement = document.createElement("li");
        const imgElement = document.createElement("img");
        // imgElement.setAttribute("src", `https://i3.ytimg.com/vi/${item.ytid}/maxresdefault.jpg`);
        // imgElement.setAttribute("alt", item.fulltitle);
        const headingElement = document.createElement("h1");
        const fullTitleElement = document.createElement("p");
        const yearElement = document.createElement("p");
        const categoryElement = document.createElement("p");
        const langElement = document.createElement("p");
        const ratingElement = document.createElement("strong");
        const moreInfo = document.createElement("button");
        const bookmarkElement = document.createElement("button");
        const elBookmarkDelete = document.createElement("button");
        
        
        // Add classlist
        liElement.classList.add("movies__items");
        imgElement.classList.add("movies__img");
        headingElement.classList.add("movies__heading");
        fullTitleElement.classList.add("movies__full-title");
        yearElement.classList.add("movies__year");
        categoryElement.classList.add("movies__category");
        langElement.classList.add("movies__lang");
        ratingElement.classList.add("movies__rating");
        moreInfo.classList.add("btn", "btn-success", "w-50", "mb-3", "modal-btn");
        bookmarkElement.classList.add("btn", "btn-primary", "w-50", "bookmark-btn");
        elBookmarkDelete.classList.add("btn", "btn-primary", "w-50", "bookmark-remove");
        
        
        // Adding textContents
        headingElement.textContent = item.Title;
        fullTitleElement.textContent = `Movie fulltitle: ${item.fulltitle}`;
        yearElement.textContent = `Movie year: ${item.movie_year}`;
        categoryElement.textContent = `Categories: ${item.Categories}`
        langElement.textContent = `Movie language: ${item.language}`;
        ratingElement.textContent = `Movie rating: ${item.imdb_rating}`;
        moreInfo.textContent = "More Info";
        moreInfo.dataset.id = item.ytid;
        moreInfo.setAttribute("data-bs-toggle", "modal");
        moreInfo.setAttribute("data-bs-target", "#exampleModal");
        bookmarkElement.textContent = "Save movie";
        bookmarkElement.dataset.id = item.ytid;
        elBookmarkDelete.textContent = "Delete";
        elBookmarkDelete.dataset.id = item.ytid;
        
        
        // Appending the elements
        if (remove) {
            liElement.append(imgElement, headingElement, fullTitleElement, yearElement, categoryElement, langElement, ratingElement, moreInfo, bookmarkElement);
        } else {
            liElement.append(headingElement, elBookmarkDelete);
        }

        ulElement.appendChild(liElement);
    });
};
renderMovies(sliced_movie, elList, true);


elSearch.addEventListener("keyup", function () {
    let searchValue = elSearch.value.trim().toLowerCase();
    
    let filtered = sliced_movie.filter(function(item) {
        let searchName = item.fulltitle.toLowerCase();
        return searchName.includes(searchValue);
    });
    renderMovies(filtered, elList);
});

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    const fromValue = elFromInput.value;
    const toValue = elToInput.value;

    // if((fromValue || toValue) == "") {
    //     alert("At least one year");
    //     return;
    // }
    
    if(fromValue && toValue) {
        const filtered_movies = sliced_movie.filter(
            (item) => 
            item.movie_year >= fromValue && 
            item.movie_year <= toValue
            );
            renderMovies(filtered_movies, elList);
        } else if(fromValue) {
            const filtered_movies = sliced_movie.filter(
                (item) => item.movie_year >= fromValue
                );
                renderMovies(filtered_movies, elList);
        } else if(toValue) {
            const filtered_movies = sliced_movie.filter(
                (item) => item.movie_year <= toValue
                );
                renderMovies(filtered_movies, elList);
    }

        // fromValue = "";
        // toValue = "";
});
            
const modalTitle = document.querySelector(".modal-title");
const modalDesc = document.querySelector(".modal-body");
modalDesc.style.color = "red";
            
elList.addEventListener("click", (evt) => {
    if(evt.target.matches(".modal-btn")) {
        const btnId = evt.target.dataset.id;
        const foundMovie = sliced_movie.find((item) => {
            return item.ytid == btnId;
        });
                    
        modalTitle.textContent = foundMovie.fulltitle;
        modalDesc.textContent = foundMovie.summary;
    }
});

elList.addEventListener("click", (evt) => {
    if(evt.target.matches(".bookmark-btn")) {
        const bookmarkBtnId = evt.target.dataset.id;
        const foundBookmarkMovie = sliced_movie.find((item) => item.ytid == bookmarkBtnId);
        bookmarkArr.push(foundBookmarkMovie);
        renderMovies(bookmarkArr, elBookmarkList);
    }
});

elBookmarkList.addEventListener("click", (evt) => {
    if(evt.target.matches(".bookmark-remove")) {
        const bookmarkBtnId = evt.target.dataset.id;
        var foundBookMark = bookmarkArr.find((item) => item.ytid == bookmarkBtnId)
    };
    bookmarkArr.splice(foundBookMark, 1);
    renderMovies(bookmarkArr, elBookmarkList, false);
});