import { createNavigationBtn } from '../views/departmentView.js';
import { createDepartmentPageElement } from '../views/departmentView.js';
import { exhibitsIdArr } from '../views/departmentView.js';
import {
  WELCOME_PAGE_ELEMENT,
  DEPARTMENT_PAGE,
  FOOTER,
  SEARCH_INPUT,
} from '../constants.js';

export function initDepartmentPage() {
  if (document.getElementById(WELCOME_PAGE_ELEMENT)) {
    document.getElementById(WELCOME_PAGE_ELEMENT).remove();
  }

  if (document.getElementById('item-element')) {
    document.getElementById('item-element').remove();
  }

  const departmentPage = document.createElement('div');
  departmentPage.id = DEPARTMENT_PAGE;

  const footer = document.getElementById(FOOTER);

  const navigationBtn = createNavigationBtn();
  departmentPage.appendChild(navigationBtn);

  const pageInterface = document.getElementById('interface');
  pageInterface.insertBefore(departmentPage, footer);

  createDepartmentPageElement(exhibitsIdArr);

  document.getElementById(SEARCH_INPUT).value = '';
}
