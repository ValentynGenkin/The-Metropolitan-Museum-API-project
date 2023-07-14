import { grabDepartmentItemsId } from './views/departmentView.js';
import { initDepartmentPage } from './pages/departmentPage.js';

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

export function fetchDepartmentsData(data) {
  const departmentMenu = document.createElement('ul');
  departmentMenu.id = 'department-menu';
  departmentMenu.style.display = 'none';

  document.getElementById('navigation-menu').appendChild(departmentMenu);

  for (const department of data.departments) {
    const departmentList = document.createElement('li');
    department.className = 'department-list';
    departmentList.textContent = department.displayName;
    departmentList.setAttribute('departmentId', department.departmentId);

    departmentMenu.appendChild(departmentList);
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
      try {
        const departmentId = element.getAttribute('departmentId');
        const specificDepartmentUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&q=cat`;
        const response = await fetch(specificDepartmentUrl);
        const data = await response.json();
        grabDepartmentItemsId(data);
        initDepartmentPage();
      } catch (error) {
        console.error(error);
      }
    });
  });
}

// ----------------------------------------------------------------

export async function fetchDepartmentExhibits(exhibitIds) {
  const exhibitQuery = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${exhibitIds}`;
  try {
    const response = await fetch(exhibitQuery);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
