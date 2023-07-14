import { createNavigationBtn } from '../views/departmentView.js';
import { createDepartmentPageElement } from '../views/departmentView.js';
import { exhibitsIdArr } from '../views/departmentView.js';
import { WELCOME_PAGE_ELEMENT } from '../constants.js';

export function initDepartmentPage() {
  document.getElementById(WELCOME_PAGE_ELEMENT).style.display = 'none';

  const pageInterface = document.getElementById('interface');
  const navigationBtn = createNavigationBtn();
  pageInterface.appendChild(navigationBtn);

  createDepartmentPageElement(exhibitsIdArr);
}
