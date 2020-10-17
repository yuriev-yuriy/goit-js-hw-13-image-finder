import './styles.css';
import cartTpl from './cartMarkup.hbs';
import apiService from './js/apiService'

const url = "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
const apiKey = '18694203-d22239baec913b213273a87a8';
const listRef = document.querySelector('.gallery');
const inputRef = document.querySelector('input');
const loadMoreBtnRef = document.querySelector('[data-action=load-more]');


inputRef.addEventListener('input', event => {
    apiService.query = inputRef.value;
    listRef.innerHTML = '';

    apiService.resetPage();

    
    getImages();
    
});

loadMoreBtnRef.addEventListener('click', getImages);

function getImages() {
    loadMoreBtnRef.classList.add('is-hidden');
    apiService
        .fetchImages()
        .then(hits => {
            (updateMarkup(hits));
            loadMoreBtnRef.classList.remove('is-hidden');
    window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
        });
   
})
}

function updateMarkup(hits) {
    const cartMarkup = cartTpl(hits);
    listRef.insertAdjacentHTML('beforeend', cartMarkup);
}


