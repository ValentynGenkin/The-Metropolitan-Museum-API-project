import { createWelcomeElement } from '../views/welcomeView.js';
import { createFooterElement } from '../views/welcomeView.js';
import { createNavMenu } from '../views/welcomeView.js';
import { fetchSearch } from '../queries.js';
import { grabDepartmentItemsId } from '../views/departmentView.js';
import { hideMenu } from '../views/departmentView.js';
import { initDepartmentPage } from '../pages/departmentPage.js';
import { searchElement } from '../views/departmentView.js';
import { fetchWiki } from '../queries.js';
import { aboutPage } from '../views/welcomeView.js';
import {
  DEPARTMENTS_BTN,
  DEPARTMENT_PAGE,
  HOME_BTN,
  SEARCH_BTN,
  SEARCH_INPUT,
  SEARCH_ELEMENT,
  WELCOME_PAGE_ELEMENT,
} from '../constants.js';

export let searchRequestValue;

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

  if (document.getElementById('burger-menu')) {
    const burgerMenu = document.getElementById('burger-menu');
    const hideMenuBlock = document.getElementById('menu-hide-block');

    burgerMenu.addEventListener('click', () => {
      if (hideMenuBlock.style.display === 'flex') {
        hideMenuBlock.style.display = 'none';
      } else {
        hideMenuBlock.style.display = 'flex';
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
      document.getElementById('menu-hide-block').style.display = 'flex';
    } else {
      document.getElementById('menu-hide-block').style.display = 'none';
    }
  });

  const homeBtn = document.getElementById(HOME_BTN);
  homeBtn.addEventListener('click', () => {
    location.reload();
  });

  const searchBtn = document.getElementById(SEARCH_BTN);

  const linkOne = document.getElementById('link-1');
  const linkTwo = document.getElementById('link-2');
  const linkThree = document.getElementById('link-3');
  linkOne.addEventListener('click', async () => {
    homeBtn.style.display = 'block';
    const response = await fetchSearch('Arms and Armor');
    grabDepartmentItemsId(response);
    initDepartmentPage();
  });
  linkTwo.addEventListener('click', async () => {
    homeBtn.style.display = 'block';
    const response = await fetchSearch('European Paintings');
    grabDepartmentItemsId(response);
    initDepartmentPage();
  });
  linkThree.addEventListener('click', async () => {
    homeBtn.style.display = 'block';
    const response = await fetchSearch('American Decorative Arts');
    grabDepartmentItemsId(response);
    initDepartmentPage();
  });

  const aboutBtn = document.getElementById('about');
  aboutBtn.addEventListener('click', async () => {
    const response = await fetchWiki();
    const data = aboutPage(response);
    document.getElementById(WELCOME_PAGE_ELEMENT).remove();
    document.getElementById('interface').appendChild(data);
  });

  searchBtn.addEventListener('click', async () => {
    try {
      const searchRequest = document.getElementById(SEARCH_INPUT).value;
      if (searchRequest.length > 0) {
        searchRequestValue = searchRequest;

        let response = await fetchSearch(searchRequest);
        if (response.total === 0) {
          response = 'Not found';
        }

        if (document.getElementById(DEPARTMENT_PAGE)) {
          document.getElementById(DEPARTMENT_PAGE).remove();
        }
        if (document.getElementById(SEARCH_ELEMENT)) {
          document.getElementById(SEARCH_ELEMENT).remove();
        }

        grabDepartmentItemsId(response);
        initDepartmentPage();
        searchElement(searchRequestValue, response);
        homeBtn.style.display = 'block';
      }
    } catch (error) {
      throw new Error('Not Found ' + error);
    }

    if (document.getElementById('department-menu').style.display === 'flex') {
      document.getElementById('department-menu').style.display = 'none';
    }
    const hideMenuBlock = document.getElementById('menu-hide-block');
    if (hideMenuBlock.style.display === 'flex') {
      hideMenuBlock.style.display = 'none';
    }

    if (document.getElementById('item-element')) {
      document.getElementById('item-element').remove();
    }
  });
};
