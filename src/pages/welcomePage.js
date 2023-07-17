import { createWelcomeElement } from '../views/welcomeView.js';
import { createFooterElement } from '../views/welcomeView.js';
import { createNavMenu } from '../views/welcomeView.js';
import { fetchSearch } from '../queries.js';
import { grabDepartmentItemsId } from '../views/departmentView.js';
import { createDepartmentPageElement } from '../views/departmentView.js';
import { exhibitsIdArr } from '../views/departmentView.js';
import { initDepartmentPage } from '../pages/departmentPage.js';
import {
  DEPARTMENTS_BTN,
  DEPARTMENT_PAGE,
  NAVIGATION_BTN,
  HOME_BTN,
  SEARCH_BTN,
  SEARCH_INPUT,
} from '../constants.js';

export const initWelcomePage = () => {
  const welcomePageInterface = document.getElementById('interface');

  const navElement = createNavMenu();
  welcomePageInterface.appendChild(navElement);

  const welcomeElement = createWelcomeElement();
  welcomePageInterface.appendChild(welcomeElement);

  const footerElement = createFooterElement();
  welcomePageInterface.appendChild(footerElement);

  const departmentBtn = document.getElementById(DEPARTMENTS_BTN);
  departmentBtn.addEventListener('click', hideMenu);

  const homeBtn = document.getElementById(HOME_BTN);
  homeBtn.addEventListener('click', () => {
    location.reload();
  });

  const searchBtn = document.getElementById(SEARCH_BTN);

  searchBtn.addEventListener('click', async () => {
    try {
      const searchRequest = document.getElementById(SEARCH_INPUT).value;
      const response = await fetchSearch(searchRequest);

      if (document.getElementById(DEPARTMENT_PAGE)) {
        document.getElementById(DEPARTMENT_PAGE).remove();
      }
      if (document.getElementById(NAVIGATION_BTN)) {
        document.getElementById(NAVIGATION_BTN).remove();
      }

      grabDepartmentItemsId(response);
      initDepartmentPage();
    } catch (error) {
      throw new Error('Not Found ' + error);
    }

    if (document.getElementById('department-menu').style.display === 'flex') {
      document.getElementById('department-menu').style.display = 'none';
    }
    if (document.getElementById('item-element')) {
      document.getElementById('item-element').remove();
    }
  });
};

function hideMenu() {
  if (document.getElementById('department-menu').style.display === 'none') {
    document.getElementById('department-menu').style.display = 'flex';
  } else {
    document.getElementById('department-menu').style.display = 'none';
  }
}
