import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';

let pageNumber = 1;

async function fetchImages(query) {
    try {
        const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`;

        const response = await axios.get(url);
        const fetchedImages = response.data;

        pageNumber += 1;

        return fetchedImages;
    } catch (error) {
        console.log(error);
    }
}

function resetPageNumber() {
    pageNumber = 1;
}

export { fetchImages };
export { resetPageNumber };


