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
} from '../constants.js';

export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.id = `${WELCOME_PAGE_ELEMENT}`;
  element.innerHTML = String.raw`
  <nav id=${NAVIGATION}>

      <img id=${NAV_LOGO} alt="logo" src="./public/assets/logo.png">

    <button type="button">Home</button>
    <button type="button">About museum</button>
    <button type="button">Departments</button>
    <button type="button">Contact</button>
  </nav>

  <div id=${MAIN_COVER}>
    <img id=${COVER_IMG} alt="cover" src="./public/assets/cover.jpg">
      <div id=${COVER_TEXT}>
        <h1 id=${MAIN_TITLE}>Welcome to The Metropolitan Museum exhibition</h1>
        <p id=${MAIN_PARAGRAPH}>The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy</p>
      </div>
  </div>

  <div id=${CATEGORY_LINK}>
    <div class=${LINKS_CLASS}>
      <h3>Title 1</h3>
      <img alt="preview-img" href="">
      <p>Some text</p>
      <button type="button">Read more</button>
    </div>
    <div class=${LINKS_CLASS}>
      <h3>Title 2</h3>
      <img alt="preview-img" href="">
      <p>Some text</p>
      <button type="button">Read more</button>
    </div>
    <div class=${LINKS_CLASS}>
      <h3>Title 3</h3>
      <img alt="preview-img" href="">
      <p>Some text</p>
      <button type="button">Read more</button>
    </div>
  </div>

  <footer id=${FOOTER}>Valentyn Genkin HYF 2023</footer>
  `;

  return element;
};
