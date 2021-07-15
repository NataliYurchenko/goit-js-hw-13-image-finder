import './sass/main.scss';
// import './js/u-patch.js';
import ImagesAPIService from './imageService.js';
import imageTpl from './templates/image.hbs';
// import LoadMoreBtn from './load-more-btn.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  imageList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loadMoreLabel: document.querySelector('.label'),
};

// const loadMoreBtn = new LoadMoreBtn('.load-more');
const imagesAPIService = new ImagesAPIService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', SearchImages);

function onSearch(event) {
  event.preventDefault();

  imagesAPIService.query = event.currentTarget.elements.query.value;

  if (imagesAPIService.query.trim() === '') {
    return alert('Please, type smth correct!');
  }

  hide();
  imagesAPIService.resetPage();
  clearImagesContainer();

  SearchImages();
}

// function onLoadMore() {
//   SearchImages();
// }

function SearchImages() {
  disable();
  // imagesAPIService.fetchImages().then(appendImagesMarkup);
  imagesAPIService.fetchImages().then(hits => {
    appendImagesMarkup(hits);
    enable();
  });
}

function appendImagesMarkup(hits) {
  refs.imageList.insertAdjacentHTML('beforeend', imageTpl({ hits }));
}

function clearImagesContainer() {
  refs.imageList.innerHTML = '';
}

function enable() {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreLabel.textContent = 'Show more';
}

function disable() {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreLabel.textContent = 'Loading...';
}

function show() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hide() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
