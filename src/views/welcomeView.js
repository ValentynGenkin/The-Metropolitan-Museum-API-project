import {
  WELCOME_PAGE_ELEMENT,
  NAVIGATION,
  NAV_LOGO,
  MAIN_COVER,
  COVER_IMG,
  MAIN_TITLE,
  MAIN_PARAGRAPH,
  CATEGORY_LINK,
  LINKS_CLASS,
  FOOTER,
  COVER_TEXT,
  firstArticle,
  secondArticle,
  thirdArticle,
  DEPARTMENTS_BTN,
  HOME_BTN,
  SEARCH_BTN,
  SEARCH_INPUT,
} from '../constants.js';

export const createNavMenu = () => {
  const element = document.createElement('nav');
  element.id = `${NAVIGATION}`;
  element.innerHTML = String.raw`
  <img id=${NAV_LOGO} alt="logo" src="./public/assets/logo.png">
  <button id="burger-menu" type="button"><img alt="search" src="./public/assets/burger.png" value=""></button>
  <a href="#interface"><img id="up" alt="up" src="./public/assets/up.png"></a>
  <div id="menu-hide-block">
  <button id=${HOME_BTN} type="button" style = "display:none">Home</button>
  <button type="button" id="about">About museum</button>
  <button id=${DEPARTMENTS_BTN} type="button">Art departments</button>
  <input type="text" id=${SEARCH_INPUT} placeholder="Search"></input>
  <button id="${SEARCH_BTN}" type="button"><img alt="search" src="./public/assets/search.png" value=""></button>
  
  </div>
  `;
  return element;
};

export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.id = `${WELCOME_PAGE_ELEMENT}`;
  element.innerHTML = String.raw`

    <div id=${MAIN_COVER}>

      <img id=${COVER_IMG} alt="cover" src="./public/assets/cover.jpg">
        <div id=${COVER_TEXT}>
          <h1 id=${MAIN_TITLE}>Welcome to The Metropolitan Museum exhibition</h1>
          <p id=${MAIN_PARAGRAPH}>The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy</p>
        </div>

    </div>

    <div id=${CATEGORY_LINK}>
      <div class=${LINKS_CLASS}>
        <h3>Arms and Armor</h3>
        <img alt="preview-img" src="./public/assets/1.jpeg">
        <p>${firstArticle}</p>
        <button type="button" id="link-1">Explore</button>
      </div>

      <div class=${LINKS_CLASS}>
        <h3>European Paintings</h3>
        <img alt="preview-img" src="./public/assets/2.jpeg">
        <p>${secondArticle}</p>
        <button type="button" id="link-2">Explore</button>
      </div>

      <div class=${LINKS_CLASS}>
        <h3>American Decorative Arts</h3>
        <img alt="preview-img" src="./public/assets/3.jpeg">
        <p>${thirdArticle}</p>
        <button type="button" id="link-3">Explore</button>
      </div>

    </div>
  `;

  return element;
};

export const createFooterElement = () => {
  const element = document.createElement('footer');
  element.id = `${FOOTER}`;
  element.textContent = 'Valentyn Genkin HYF 2023';
  return element;
};

export function aboutPage(response) {
  const element = document.createElement('div');
  element.id = 'about-page';
  element.innerHTML = String.raw`
  <img alt="TMM-logo" src="${response.thumbnail.source}">
  <a href="${response.content_urls.desktop.page}">Wikipedia Link</a>
  `;
  return element;
}
