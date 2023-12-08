import { fetchBreeds, fetchCatByBreed, fetchCatBreedInfo } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function fillChoiceBox(choiceBox, arr) {
  arr.forEach(el => {
    const option = document.createElement('option');
    option.value = el.id;
    option.textContent = el.name;
    choiceBox.appendChild(option);
  });
}

fetchBreeds().then(arr => {
  fillChoiceBox(breedSelect, arr);
});

breedSelect.addEventListener('change', function (event) {
  objIsVisible(loader);
  catInfo.innerHTML = '';
  const selectedBreedId = event.target.value;

  fetchCatByBreed(selectedBreedId)
    .then(catsArray => {
      catInfo.innerHTML = catBlockMarkup(catsArray);      
    })
    .catch(error => {
      showError('Oops! Something went wrong! Try reloading the page!');
      console.error('Error fetching cat info:', error);
    })
    .finally(() => {
      objIsHiden(loader);
    });
});

function catBlockMarkup(catsArray) {
  const url = catsArray[0].url;
  return catsArray[0].breeds
    .map(({ name, description, temperament }) => {
      return `
        <img src="${url}" alt="" class="cat-info__img">      
        <div class="cat-info__text-side">
          <h2 class="cat-info__title">${name}</h2>
          <p class="cat-info__subtitle">${description}</p>
          <p class="cat-info__temperament"><b>Temperament: </b>${temperament}</p>
        </div>
        `;
    })
    .join('');
}

function showError(textContent) {
  Notiflix.Notify.failure(textContent);
}
function objIsVisible(...objs) {
  objs.forEach(obj => {
    obj.classList.remove('is-hiden');
  });
}
function objIsHiden(...objs) {
  objs.forEach(obj => {
    obj.classList.add('is-hiden');
  });
}
