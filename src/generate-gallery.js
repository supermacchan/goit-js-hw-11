import Notiflix from 'notiflix';

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
        return;
    } 

    const newGallery = generateGalleryMarkup(fetchedImages.hits);
    placeGalleryMarkup(newGallery);
    Notiflix.Notify.success(`Hooray! We found ${fetchedImages.totalHits} images.`);
}


export { createGallery };