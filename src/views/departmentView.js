import {
  NEXT_PAGE_BTN,
  PREVIOUS_PAGE_BTN,
  NAVIGATION_BTN,
  DEPARTMENT_CONTAINER,
  DEPARTMENT_PAGE,
  SEARCH_ELEMENT,
} from '../constants.js';
import { fetchDepartmentExhibits } from '../queries.js';
import { createItemElement } from './exhibitView.js';
import { searchRequestValue } from '../pages/welcomePage.js';
import { fetchFilteredSearch } from '../queries.js';
import { initDepartmentPage } from '../pages/departmentPage.js';

export const exhibitsIdArr = [];

export function grabDepartmentItemsId(data) {
  exhibitsIdArr.length = 0;

  if (data.objectIDs) {
    exhibitsIdArr.push(data.objectIDs);
  } else {
    exhibitsIdArr.push(data);
  }
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
  console.log('hi');
  const nextBtn = document.getElementById(NEXT_PAGE_BTN);
  const previousBtn = document.getElementById(PREVIOUS_PAGE_BTN);
  const parent = document.getElementById(DEPARTMENT_PAGE);

  const departmentContainer = document.createElement('div');
  departmentContainer.id = `${DEPARTMENT_CONTAINER}`;
  parent.appendChild(departmentContainer);
  let startIndex = 0;
  const chunk = 12;

  async function handleClick(direction) {
    const items = array.flat();
    if (direction === 'next') {
      if (direction === 'next' && startIndex + 12 <= items.length) {
        startIndex += chunk;
        console.log(startIndex);
      }
    } else if (direction === 'previous') {
      startIndex -= chunk;
      if (startIndex < 0) {
        startIndex = 0;
      }
    }

    const endIndex = startIndex + chunk;

    const fetchPromises = [];
    for (let i = startIndex; i < endIndex && i < items.length; i++) {
      const promise = fetchDepartmentExhibits(items[i]);
      fetchPromises.push(promise);
    }
    const responses = await Promise.all(fetchPromises);

    const department = document.getElementById(DEPARTMENT_CONTAINER);
    department.innerHTML = '';

    for (const data of responses) {
      const element = document.createElement('div');
      element.className = 'item-card';
      element.setAttribute('objectID', data.objectID);
      if (!data.isPublicDomain) {
        data.primaryImageSmall = '../public/assets/no-img.png';
      }
      if (data.message === 'Not a valid object') {
      } else {
        element.innerHTML = String.raw`
      <div class="item-link"> 
      <div class="item-img">
      <img src="${data.primaryImageSmall}" alt="${data.title}">
      </div>
      <div>
      <span>${data.title}</span>
      <span>${data.artistDisplayName}</span>
      <span>${data.objectDate}</span>
      </div>
      </div>
      `;

        if (exhibitsIdArr[0] === 'No exhibits available') {
          if (document.getElementById(NAVIGATION_BTN)) {
            document.getElementById(NAVIGATION_BTN).remove();
          }
          element.innerHTML = String.raw`
            <p>No exhibits available at the moment</p>
            `;
        }

        element.addEventListener('click', () => {
          createItemElement(data);
          document.getElementById(DEPARTMENT_PAGE).style.display = 'none';
          document.getElementById(NAVIGATION_BTN).style.display = 'none';
          document.getElementById(SEARCH_ELEMENT).style.display = 'none';
        });

        if (exhibitsIdArr[0] === 'Not found') {
          if (document.getElementById(NAVIGATION_BTN)) {
            document.getElementById(NAVIGATION_BTN).remove();
          }

          element.innerHTML = String.raw`
            <p>No matches found for your request: "${searchRequestValue}"</p>
            `;
          element.removeAttribute('objectID');
        }
        department.appendChild(element);
      }
    }
  }

  await handleClick('previous');

  nextBtn.addEventListener('click', () => handleClick('next'));
  previousBtn.addEventListener('click', () => handleClick('previous'));
}

export function fetchDepartmentsData(data) {
  const departmentMenu = document.createElement('ul');
  departmentMenu.id = 'department-menu';
  departmentMenu.style.display = 'none';

  document.getElementById('navigation-menu').appendChild(departmentMenu);

  for (const department of data.departments) {
    const departmentList = document.createElement('li');
    department.className = 'department-list';
    departmentList.textContent = department.displayName;
    departmentList.setAttribute('departmentId', department.departmentId);

    departmentMenu.appendChild(departmentList);
  }
}

export function hideMenu() {
  if (document.getElementById('department-menu').style.display === 'none') {
    document.getElementById('department-menu').style.display = 'flex';
  } else {
    document.getElementById('department-menu').style.display = 'none';
  }
}

export async function searchElement(data, response) {
  const element = document.createElement('div');
  element.id = SEARCH_ELEMENT;
  element.innerHTML = String.raw`
  <p>Search results for: ${data}</p>
  <form>
  <p>Show Only:</p>
  <input id="is-on-view" type="checkbox">
  <label for="html">Artworks on Display</label>
  <input id="is-highlight" type="checkbox">
  <label for="html">Highlights</label>
  </form>
  `;
  if (response === 'Not found') {
    return;
  } else {
    const interfaceBlok = document.getElementById('interface');
    interfaceBlok.insertBefore(element, interfaceBlok.children[1]);
  }

  let onViewCheck = '';
  let highlightCheck = '';
  const onView = document.getElementById('is-on-view');
  onView.addEventListener('change', async (e) => {
    const status = e.target.checked;
    onViewCheck = `isOnView=${status}&`;
    if (status === false) {
      onViewCheck = '';
    }
    const searchData = await fetchFilteredSearch(
      searchRequestValue,
      onViewCheck,
      highlightCheck,
    );

    document.getElementById(DEPARTMENT_PAGE).remove();

    grabDepartmentItemsId(searchData);

    initDepartmentPage();
  });
  const highlight = document.getElementById('is-highlight');
  highlight.addEventListener('change', async (e) => {
    const status = e.target.checked;
    highlightCheck = `isHighlight=${status}&`;
    if (status === false) {
      highlightCheck = '';
    }
    const searchData = await fetchFilteredSearch(
      searchRequestValue,
      onViewCheck,
      highlightCheck,
    );

    document.getElementById(DEPARTMENT_PAGE).remove();

    grabDepartmentItemsId(searchData);

    initDepartmentPage();
  });
}
