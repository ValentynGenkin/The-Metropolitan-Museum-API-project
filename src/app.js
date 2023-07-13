import { initWelcomePage } from './pages/welcomePage.js';
import { initDepartmentsMenu } from './queries.js';

const loadApp = () => {
  initWelcomePage();
  initDepartmentsMenu();
};

window.addEventListener('load', loadApp);
