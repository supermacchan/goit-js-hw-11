let pageNumber = 1;

async function fetchImages(query) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';

    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`);
    const fetchedImages = await response.json();
    pageNumber += 1;
    return fetchedImages;
}

function resetPageNumber() {
    pageNumber = 1;
}

export { fetchImages };
export { resetPageNumber };


