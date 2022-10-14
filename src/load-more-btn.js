const loadMoreBtn = document.querySelector('.load-more');

function makeButtonVisible() {
    loadMoreBtn.classList.remove('is-hidden')
}

function hideButton() {
    loadMoreBtn.classList.add('is-hidden');
}

export { makeButtonVisible };
export { hideButton };