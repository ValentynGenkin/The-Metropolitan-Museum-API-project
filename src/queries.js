import { grabDepartmentItemsId } from './views/departmentView.js';
import { initDepartmentPage } from './pages/departmentPage.js';
import { fetchDepartmentsData } from './views/departmentView.js';
import { DEPARTMENT_PAGE, HOME_BTN, SEARCH_ELEMENT } from './constants.js';

const departmentsUrl =
  'https://collectionapi.metmuseum.org/public/collection/v1/departments';

export async function getArtDepartments(url) {
  try {
    const artDepartments = await fetch(url);
    if (artDepartments.ok) {
      const response = await artDepartments.json();
      return response;
    } else {
      throw new Error(`HTTP status error ` + artDepartments.status);
    }
  } catch (error) {
    console.error(error.message);
  }
}

export async function initDepartmentsMenu() {
  try {
    const response = await fetch(departmentsUrl);
    const data = await response.json();
    fetchDepartmentsData(data);
    fetchSpecificDepartment();
  } catch (error) {
    console.error(error.message);
  }
}

export function fetchSpecificDepartment() {
  const departmentList = document.querySelectorAll('#department-menu li');

  departmentList.forEach((element) => {
    element.addEventListener('click', async () => {
      const hideMenuBlock = document.getElementById('menu-hide-block');
      if (hideMenuBlock.style.display === 'flex') {
        hideMenuBlock.style.display = 'none';
      }
      const homeBtn = document.getElementById(HOME_BTN);
      homeBtn.style.display = 'block';
      if (document.getElementById(DEPARTMENT_PAGE)) {
        document.getElementById(DEPARTMENT_PAGE).remove();
      }
      if (document.getElementById(SEARCH_ELEMENT)) {
        document.getElementById(SEARCH_ELEMENT).remove();
      }

      document.getElementById('department-menu').style.display = 'none';

      try {
        const departmentId = element.getAttribute('departmentId');
        const specificDepartmentUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&q=cat`;
        const response = await fetch(specificDepartmentUrl);
        let data = await response.json();
        if (data.total === 0) {
          data = 'No exhibits available';
        }

        grabDepartmentItemsId(data);
        initDepartmentPage();
      } catch (error) {
        console.error(error);
      }
    });
  });
}

export async function fetchDepartmentExhibits(exhibitIds) {
  const exhibitQuery = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${exhibitIds}`;
  try {
    const response = await fetch(exhibitQuery);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`response error: ` + error);
  }
}

export async function fetchSearch(request) {
  const searchRequest = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${request}`;
  try {
    const response = await fetch(searchRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFilteredSearch(request, isOnView, isHighlight) {
  const searchRequest = `https://collectionapi.metmuseum.org/public/collection/v1/search?${isOnView}${isHighlight}q=${request}`;
  try {
    const response = await fetch(searchRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchWiki() {
  const searchRequest = `https://en.wikipedia.org/api/rest_v1/page/summary/Metropolitan_Museum_of_Art`;
  try {
    const response = await fetch(searchRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
