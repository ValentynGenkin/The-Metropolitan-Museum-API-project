import { createWelcomeElement } from '../views/welcomeView.js';
import { createFooterElement } from '../views/welcomeView.js';
import { createNavMenu } from '../views/welcomeView.js';

export const initWelcomePage = () => {
  const welcomePageInterface = document.getElementById('interface');

  const navElement = createNavMenu();
  welcomePageInterface.appendChild(navElement);

  const welcomeElement = createWelcomeElement();
  welcomePageInterface.appendChild(welcomeElement);

  const footerElement = createFooterElement();
  welcomePageInterface.appendChild(footerElement);
};
