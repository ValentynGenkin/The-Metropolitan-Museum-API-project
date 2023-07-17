import {
  ITEM_ELEMENT,
  DEPARTMENT_CONTAINER,
  DEPARTMENT_PAGE,
  FOOTER,
} from '../constants.js';

export function createItemElement(data) {
  const element = document.createElement('div');
  element.id = `${ITEM_ELEMENT}`;
  if (!data.isPublicDomain) {
    data.primaryImageSmall = '../public/assets/no-img.png';
  }

  element.innerHTML = String.raw`
  <div>
  <img src="${data.primaryImageSmall}" alt="${data.title}">
  <ul>
  <li>Department: ${data.department}</li>
  <li id="culture">Culture ${data.culture}</li>
  <li>Title: ${data.title}</li>
  <li id="artist">Artist: ${data.artistDisplayName}</li>
  <li>Materials: ${data.medium}</li>
  <li>Date: ${data.objectDate}</li>
  <li>Credit line: ${data.creditLine}</li>
  <li id="dimensions">Dimensions: ${data.dimensions}</li>
  <li>Accession year: ${data.accessionYear}</li>
  </ul>
  <button id="close-bnt" type="button">Close</button>
  </div>
  `;
  if (data.artistDisplayName === '') {
    const liElement = element.querySelector('li#artist');
    liElement.style.display = 'none';
  }
  if (data.dimensions === '') {
    const liElement = element.querySelector('li#dimensions');
    liElement.style.display = 'none';
  }
  if (data.culture === '') {
    const liElement = element.querySelector('li#culture');
    liElement.style.display = 'none';
  }

  const footer = document.getElementById(FOOTER);
  const pageInterface = document.getElementById('interface');
  pageInterface.insertBefore(element, footer);

  const closeBtn = document.getElementById('close-bnt');
  closeBtn.addEventListener('click', () => {
    element.remove();
    document.getElementById(DEPARTMENT_PAGE).style.display = 'block';
  });
}
