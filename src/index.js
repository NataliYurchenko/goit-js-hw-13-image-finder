import './sass/main.scss';
// import './js/u-patch.js';
import ImagesAPIServise from './fetchImages.js';
import imageTpl from './templates/image.hbs';
console.log(imageTpl);

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  // може пригодяться )
  searchInput: document.querySelector('.search'),
  countryDiv: document.querySelector('.gallery'),
};

const imagesAPIServise = new ImagesAPIServise();
console.log(imagesAPIServise);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  imagesAPIServise.query = event.currentTarget.elements.query.value;
  imagesAPIServise.fetchImages();
}

function onLoadMore() {
  imagesAPIServise.fetchImages();
}
