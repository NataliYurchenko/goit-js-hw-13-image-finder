import './sass/main.scss';
// import './js/u-patch.js';
// import './js/img-lightBox.js';
import * as basicLightbox from 'basiclightbox';
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
window.addEventListener('click', onImgClick);

function onSearch(event) {
  event.preventDefault();

  imagesAPIService.query = event.currentTarget.elements.query.value;
  const form = event.currentTarget;

  // imagesAPIService.reset();
  // imagesAPIService.query.reset();

  // imagesAPIService.query.resetQueryValue;
  if (imagesAPIService.query.trim() === '') {
    return alert('Please, type smth correct!');
  }

  show();
  imagesAPIService.resetPage();
  clearImagesContainer();

  SearchImages();
  form.reset();
}

// function onLoadMore() {
//   SearchImages();
// }

function SearchImages() {
  disable();
  // imagesAPIService.fetchImages().then(appendImagesMarkup);
  imagesAPIService.fetchImages().then(hits => {
    if (hits.length === 0) {
      hide();
      return alert('Please, type smth correct!');
    }
    appendImagesMarkup(hits);
    enable();
  });
}

function appendImagesMarkup(hits) {
  refs.imageList.insertAdjacentHTML('beforeend', imageTpl({ hits }));
  scrollPage();
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
  refs.loadMoreLabel.textContent = 'Hang on...';
}

function show() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hide() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function scrollPage() {
  const element = document.getElementById('load-more-btn');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function onImgClick(event) {
  // event.preventDefault();

  const img = event.target;
  if (img.nodeName !== 'IMG') {
    return;
  }
  const bigImgUrl = img.dataset.src;
  const instance = basicLightbox.create(`
    <img src="${bigImgUrl}" width="800" height="600">
`);

  instance.show();

  // refs.lightbox.classList.add('is-open');
  // window.addEventListener('keydown', onEscClick);
}

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
