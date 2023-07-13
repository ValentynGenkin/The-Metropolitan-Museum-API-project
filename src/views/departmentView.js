import {
  NEXT_PAGE_BTN,
  PREVIOUS_PAGE_BTN,
  NAVIGATION_BTN,
} from '../constants.js';
import { fetchDepartmentExhibits } from '../queries.js';

const exhibitsIdArr = [];

export function grabDepartmentItemsId(data) {
  exhibitsIdArr.length = 0;

  const chunkSize = 12;

  const innerArray = data.objectIDs;

  for (let i = 0; i < innerArray.length; i += chunkSize) {
    const chunk = innerArray.slice(i, i + chunkSize);
    exhibitsIdArr.push(...[chunk]);
  }
  console.log(exhibitsIdArr);
}

export function createNavigationBtn() {
  const element = document.createElement('div');
  element.id = `${NAVIGATION_BTN}`;
  element.innerText = String.raw`
  <button type="button id=${NEXT_PAGE_BTN}>Next page</button>
  <button type="button id=${PREVIOUS_PAGE_BTN}>Previous page</button>
  `;
  return element;
}

export function createDepartmentPageElement() {}
