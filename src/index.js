import './styles.css';
import cartTpl from './cartMarkup.hbs';
import apiService from './js/apiService'
import { debounce } from 'lodash';
const listRef = document.querySelector('.gallery');
const inputRef = document.querySelector('input');
const loadMoreBtnRef = document.querySelector('[data-action=load-more]');


const debouncedCallback = _.debounce(event => {
    apiService.query = inputRef.value;
    listRef.innerHTML = '';

    apiService.resetPage();

    
    getImages();
    
}, 500);

inputRef.addEventListener('input', debouncedCallback);

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
    if (!inputRef.value.length) {
        return;
    } else if (hits.length === 0) {
        alert('Ничего не найдено');
        return;
    } else {const cartMarkup = cartTpl(hits);
    listRef.insertAdjacentHTML('beforeend', cartMarkup);}
   
}


