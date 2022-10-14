import { fetchImages } from "./api-service";
import { resetPageNumber } from "./api-service";
import { createGallery } from "./generate-gallery";
// import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form');
// const formInput = document.querySelector('input');
// const imageGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

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
    let lightboxGallery = new SimpleLightbox('.gallery a');
}

async function handleLoadMore(e) {
    const moreImages = await fetchImages(query);
    console.log(moreImages.hits);
}

