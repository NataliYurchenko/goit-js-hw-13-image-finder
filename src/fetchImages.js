export default class ImagesAPIServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    console.log(this);
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22483771-18519a50b2d0c81ea196fe468`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
      });
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export default async function fetchImages(searchQuery) {
//   const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=22483771-18519a50b2d0c81ea196fe468`;
//   const response = await fetch(url);
//   return response.json();
// }

// fetchImages('pig').then(console.log);

// function fetchImages(searchQuery) {
//   const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=22483771-18519a50b2d0c81ea196fe468`;
//   return fetch(url).then(r => r.json());
// }

// fetchImages('cat').then(console.log);

// const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=butterfly&page=1&per_page=12&key=22483771-18519a50b2d0c81ea196fe468`;
// fetch(url)
//   .then(r => r.json())
//   .then(console.log);

// key = 22483771-18519a50b2d0c81ea196fe468
//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
