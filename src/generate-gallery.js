import Notiflix from 'notiflix';
import { makeButtonVisible } from "./load-more-btn";
import { hideButton } from "./load-more-btn";

const imageGallery = document.querySelector('.gallery');

function generateGalleryMarkup(images) {
    return images
        .map(image => {
            const smallImage = image.webformatURL;
            const largeImage = image.largeImageURL;
            const alt = image.tags;
            const likes = image.likes;
            const views = image.views;
            const comments = image.comments;
            const downloads = image.downloads;

            const IMAGE_CARD_MARKUP = `<a class="photo-card" href="${largeImage}">
                <img class="gallery-image" src="${smallImage}" alt="${alt}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </a>`;

            return IMAGE_CARD_MARKUP; 
        })
        .join('');
}

function placeGalleryMarkup(markup) {
    imageGallery.innerHTML = markup;
}

function createGallery(fetchedImages) {
    if (fetchedImages.hits.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        imageGallery.innerHTML = '';
        hideButton();
        return;
    }

    const newGallery = generateGalleryMarkup(fetchedImages.hits);
    placeGalleryMarkup(newGallery);
    Notiflix.Notify.success(`Hooray! We found ${fetchedImages.totalHits} images.`);
    makeButtonVisible();
}

function addMoreImages(fetchedImages) {
    const newImages = generateGalleryMarkup(fetchedImages.hits);

    if (fetchedImages.hits.length < 40) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        hideButton();
    }

    imageGallery.insertAdjacentHTML('beforeend', newImages);
    slowScroll();
}
    

function slowScroll() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2.3,
    behavior: "smooth",
    });
}

export { createGallery };
export { addMoreImages };
