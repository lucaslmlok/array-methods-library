const {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
} = require("./arraySortMethods");

function forEach(array, cb) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    cb(element, i, array);
  }
}

function map(array, cb) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    newArray.push(cb(element, i, array));
  }
  return newArray;
}

function filter(array, cb) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (cb(element, i, array)) {
      newArray.push(element);
    }
  }
  return newArray;
}

function reduce(array, cb, initialValue) {
  let currentValue = initialValue;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (initialValue == null && i === 0) {
      currentValue = element;
    } else {
      currentValue = cb(currentValue, element, i, array);
    }
  }
  return currentValue;
}

function some(array, cb) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (cb(element, i, array)) return true;
  }
  return false;
}

function every(array, cb) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (!cb(element, i, array)) return false;
  }
  return true;
}

function flat(array, depth = 1) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (depth > 0 && Array.isArray(element)) {
      newArray.push(...flat(element, depth - 1));
    } else {
      newArray.push(element);
    }
  }
  return newArray;
}

function find(array, cb) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (cb(element, i, array)) return element;
  }
}

function includes(array, searchElement, formIndex = 0) {
  for (let i = formIndex; i < array.length; i++) {
    const element = array[i];
    if (element === searchElement) return true;
  }
  return false;
}

function findIndex(array, cb) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (cb(element, i, array)) return i;
  }
  return -1;
}

function sort(array, compareFn) {
  return quickSort(array, compareFn);
  return mergeSort(array, compareFn);
  return selectionSort(array, compareFn);
  return insertionSort(array, compareFn);
  return bubbleSort(array, compareFn);
}

module.exports = {
  forEach,
  map,
  filter,
  reduce,
  some,
  every,
  flat,
  find,
  includes,
  findIndex,
  sort,
};
