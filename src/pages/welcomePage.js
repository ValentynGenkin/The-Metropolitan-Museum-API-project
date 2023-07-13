import { createWelcomeElement } from '../views/welcomeView.js';
import { createFooterElement } from '../views/welcomeView.js';
import { createNavMenu } from '../views/welcomeView.js';
import { DEPARTMENTS_BTN } from '../constants.js';

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
};

function hideMenu() {
  if (document.getElementById('department-menu').style.display === 'none') {
    document.getElementById('department-menu').style.display = 'flex';
  } else {
    document.getElementById('department-menu').style.display = 'none';
  }
}
