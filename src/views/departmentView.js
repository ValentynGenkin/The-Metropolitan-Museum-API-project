const arr = [];

export function grabDepartmentItemsId(data) {
  arr.length = 0;

  const chunkSize = 12;

  const innerArray = data.objectIDs;

  for (let i = 0; i < innerArray.length; i += chunkSize) {
    const chunk = innerArray.slice(i, i + chunkSize);
    arr.push(...[chunk]);
  }
  console.log(arr);
}

export function createDepartmentPageElement() {}
