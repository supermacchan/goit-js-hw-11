import Notiflix from 'notiflix';

function fetchImages(query) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';

    fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            console.log(data.hits);
            return data.hits;
        })
        .catch(error => {
            console.log(error);
        })
}

export { fetchImages };


