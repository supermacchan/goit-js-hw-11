import { fetchImages } from "./api-service";
import { resetPageNumber } from "./api-service";
import { createGallery } from "./generate-gallery";
import { addMoreImages } from "./generate-gallery";
import { makeButtonVisible } from "./load-more-btn";
import { hideButton } from "./load-more-btn";

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';

form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function onSearchSubmit(e) {
    e.preventDefault();

    query = e.currentTarget.elements.searchQuery.value;

    resetPageNumber();
    const fetchedImages = await fetchImages(query);
    
    console.log(fetchedImages.hits);
        
    createGallery(fetchedImages);
    makeButtonVisible();
    slowScroll();
    let lightboxGallery = new SimpleLightbox('.gallery a');
}

async function handleLoadMore(e) {
    try {
        const moreImages = await fetchImages(query);

        console.log(moreImages.hits);
        console.log(moreImages);
        console.log(moreImages.totalHits);

        addMoreImages(moreImages);
        let lightboxGallery = new SimpleLightbox('.gallery a');
        slowScroll();
    } catch (error) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        hideButton();
    }
    
}

function slowScroll() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 11,
    behavior: "smooth",
    });
}

