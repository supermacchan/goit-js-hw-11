import { fetchImages } from "./fetch-images";

const form = document.querySelector('.search-form');
const formInput = document.querySelector('input');


form.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
    e.preventDefault();
    const query = formInput.value;
    const fetchedImages = fetchImages(query);
    console.log(fetchedImages);

}

const IMAGE_CARD_MARKUP = `<div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
        </p>
        <p class="info-item">
            <b>Views</b>
        </p>
        <p class="info-item">
            <b>Comments</b>
        </p>
        <p class="info-item">
            <b>Downloads</b>
        </p>
    </div>
</div>`;