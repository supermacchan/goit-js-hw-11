import { fetchImages } from "./api-service";
import { resetPageNumber } from "./api-service";
import { createGallery } from "./generate-gallery";
import { addMoreImages } from "./generate-gallery";
import { hideButton } from "./load-more-btn";

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let lightboxGallery;

form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function onSearchSubmit(e) {
    e.preventDefault();

    query = e.currentTarget.elements.searchQuery.value;

    resetPageNumber();
    const fetchedImages = await fetchImages(query);
            
    createGallery(fetchedImages);
    lightboxGallery = new SimpleLightbox('.gallery a');
}

async function handleLoadMore(e) {
        const moreImages = await fetchImages(query);

        addMoreImages(moreImages);
        lightboxGallery.refresh();
}


