import { createWelcomeElement } from '../views/welcomeView.js';

export const initWelcomePage = () => {
  const welcomePageInterface = document.getElementById('interface');
  const welcomeElement = createWelcomeElement();
  welcomePageInterface.appendChild(welcomeElement);
};
