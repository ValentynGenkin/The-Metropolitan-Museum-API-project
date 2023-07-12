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
} from '../constants.js';

export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.id = `${WELCOME_PAGE_ELEMENT}`;
  element.innerHTML = String.raw`
  <nav id=${NAVIGATION}>
    <button type="button">
      <img id=${NAV_LOGO} alt="logo" href="./public/assets/logo.png">
    </button>
    <button type="button">1</button>
    <button type="button">2</button>
    <button type="button">3</button>
    <button type="button">4</button>
  </nav>

  <div id=${MAIN_COVER}>
    <img id=${COVER_IMG} alt="cover" href="">
    <h1 id=${MAIN_TITLE}>Main title</h1>
    <p id=${MAIN_PARAGRAPH}>Main paragraph</p>
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
