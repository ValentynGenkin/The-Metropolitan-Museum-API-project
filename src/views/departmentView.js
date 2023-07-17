import {
  NEXT_PAGE_BTN,
  PREVIOUS_PAGE_BTN,
  NAVIGATION_BTN,
  DEPARTMENT_CONTAINER,
  DEPARTMENT_PAGE,
} from '../constants.js';
import { fetchDepartmentExhibits } from '../queries.js';
import { createItemElement } from './exhibitView.js';

export const exhibitsIdArr = [];

export function grabDepartmentItemsId(data) {
  exhibitsIdArr.length = 0;
  exhibitsIdArr.push(data.objectIDs);
}

export function createNavigationBtn() {
  const element = document.createElement('div');
  element.id = `${NAVIGATION_BTN}`;
  element.innerHTML = String.raw`
  <button type="button" id=${NEXT_PAGE_BTN}>Next page</button>
  <button type="button" id=${PREVIOUS_PAGE_BTN}>Previous page</button>
  `;
  return element;
}

export async function createDepartmentPageElement(array) {
  const nextBtn = document.getElementById(NEXT_PAGE_BTN);
  const previousBtn = document.getElementById(PREVIOUS_PAGE_BTN);
  const parent = document.getElementById(DEPARTMENT_PAGE);

  const departmentContainer = document.createElement('div');
  departmentContainer.id = `${DEPARTMENT_CONTAINER}`;
  parent.appendChild(departmentContainer);

  let startIndex = 0;
  const chunk = 12;

  async function handleClick(direction) {
    const department = document.getElementById(DEPARTMENT_CONTAINER);
    department.innerHTML = '';

    const items = array.flat();
    if (direction === 'next') {
      startIndex += chunk;
    } else if (direction === 'previous') {
      startIndex -= chunk;
      if (startIndex < 0) {
        startIndex = 0;
      }
    }

    const endIndex = startIndex + chunk;

    const fetchPromises = [];
    for (let i = startIndex; i < endIndex && i < items.length; i++) {
      fetchPromises.push(fetchDepartmentExhibits(items[i]));
    }

    const responses = await Promise.all(fetchPromises);

    for (const data of responses) {
      const element = document.createElement('div');
      element.setAttribute('objectID', data.objectID);

      if (!data.isPublicDomain) {
        data.primaryImageSmall = '../public/assets/no-img.png';
      }
      if (data.message === 'Not a valid object') {
      } else {
        element.innerHTML = String.raw`
      <a href="#" class="item-link"> 
      <img src="${data.primaryImageSmall}" alt="${data.title}">
      <span>${data.title}</span>
      <span>${data.artistDisplayName}</span>
      <span>${data.objectDate}</span>
      </a>
      `;
        department.appendChild(element);
        element.addEventListener('click', () => {
          createItemElement(data);
          document.getElementById(DEPARTMENT_PAGE).style.display = 'none';
        });
      }
    }
  }

  await handleClick('previous');

  nextBtn.addEventListener('click', () => handleClick('next'));
  previousBtn.addEventListener('click', () => handleClick('previous'));
}
