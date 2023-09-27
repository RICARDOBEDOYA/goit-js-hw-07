import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');
let instance = null;

galleryItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = item.original;

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = item.preview;
  image.alt = item.description;
  image.dataset.source = item.original; // Añade el atributo data-source

  link.appendChild(image);
  listItem.appendChild(link);

  galleryList.appendChild(listItem);
});

galleryList.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const largeImageUrl = e.target.dataset.source; // Obtiene la URL desde el atributo data-source

    instance = basicLightbox.create(`
      <img src="${largeImageUrl}" width="800" height="600">
    `);

    instance.show();

    document.addEventListener('keydown', handleKeyDown);
  }
});

function handleKeyDown(event) {
  if (event.code === 'Escape') {
    instance.close();
    document.removeEventListener('keydown', handleKeyDown);
  }
}

