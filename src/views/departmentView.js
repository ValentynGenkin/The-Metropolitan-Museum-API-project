import {
  NEXT_PAGE_BTN,
  PREVIOUS_PAGE_BTN,
  NAVIGATION_BTN,
  DEPARTMENT_CONTAINER,
} from '../constants.js';
import { fetchDepartmentExhibits } from '../queries.js';

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

//-----------------------------------------
let startIndex = 0;
const chunk = 12;

export async function createDepartmentPageElement(array) {
  const nextBtn = document.getElementById(NEXT_PAGE_BTN);
  const previousBtn = document.getElementById(PREVIOUS_PAGE_BTN);
  const parent = document.getElementById('interface');

  const departmentContainer = document.createElement('div');
  departmentContainer.id = `${DEPARTMENT_CONTAINER}`;
  parent.appendChild(departmentContainer);
  const items = array.flat();

  async function handleClick(direction) {
    const department = document.getElementById(DEPARTMENT_CONTAINER);
    department.innerHTML = '';

    if (direction === 'next') {
      startIndex += chunk;
    } else if (direction === 'previous') {
      startIndex -= chunk;
      if (startIndex < 0) {
        startIndex = 0;
      }
    }

    console.log(startIndex);
    const endIndex = startIndex + chunk;

    const fetchPromises = [];
    for (let i = startIndex; i < endIndex && i < items.length; i++) {
      fetchPromises.push(fetchDepartmentExhibits(items[i]));
    }

    const responses = await Promise.all(fetchPromises);

    for (const data of responses) {
      const element = document.createElement('div');
      element.innerHTML = data.objectName;
      department.appendChild(element);
    }
  }

  await handleClick('previous');
  nextBtn.addEventListener('click', () => handleClick('next'));
  previousBtn.addEventListener('click', () => handleClick('previous'));
}
