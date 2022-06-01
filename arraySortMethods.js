const defaultCompareFn = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  if (a === b) return 0;
};

function bubbleSort(array, compareFn = defaultCompareFn) {
  // Outer pass
  for (let i = 0; i < array.length - 1; i++) {
    // Inner pass
    for (let j = 0; j < array.length - 1; j++) {
      // Delcare two elements
      const [a, b] = [array[j], array[j + 1]];
      // Compare
      if (compareFn(a, b) > 0) {
        // Swap
        [array[j], array[j + 1]] = [b, a];
      }
    }
  }
  return array;
}

function insertionSort(array, compareFn = defaultCompareFn) {
  // Start from the second element
  for (let i = 1; i < array.length; i++) {
    // Go through the elements behind it
    for (let j = i - 1; j > -1; j--) {
      // Delcare two elements
      const [a, b] = [array[j], array[j + 1]];
      // Compare
      if (compareFn(a, b) > 0) {
        // Swap
        [array[j], array[j + 1]] = [b, a];
      }
    }
  }
  return array;
}

function selectionSort(array, compareFn = defaultCompareFn) {
  // Start passes
  for (let i = 0; i < array.length - 1; i++) {
    // Index of the smallest element to be the ith element
    let min = i;
    // Check through the rest of the array for a lesser element
    for (let j = i + 1; j < array.length; j++) {
      // Delcare two elements
      const [a, b] = [array[min], array[j]];
      // Compare
      if (compareFn(a, b) > 0) {
        min = j;
      }
    }
    //Compare the indexes
    if (min !== i) {
      // Swap
      [array[i], array[min]] = [array[min], array[i]];
    }
  }
  return array;
}

function merge(arrayA, arrayB, compareFn) {
  const mergedArray = [];
  while (arrayA.length > 0 && arrayB.length > 0) {
    const [a, b] = [arrayA[0], arrayB[0]];
    if (compareFn(a, b) > 0) {
      mergedArray.push(arrayB.shift());
    } else {
      mergedArray.push(arrayA.shift());
    }
  }
  while (arrayA.length > 0) {
    mergedArray.push(arrayA.shift());
  }
  while (arrayB.length > 0) {
    mergedArray.push(arrayB.shift());
  }
  return mergedArray;
}

function mergeSort(array, compareFn = defaultCompareFn) {
  if (array.length <= 1) return array;
  const mid = Math.ceil(array.length / 2);
  let arrayA = array.slice(0, mid);
  let arrayB = array.slice(mid);
  arrayA = mergeSort(arrayA, compareFn);
  arrayB = mergeSort(arrayB, compareFn);
  return merge(arrayA, arrayB, compareFn);
}

function partition(array, compareFn, left, right) {
  const pivot = array[Math.floor((left + right) / 2)];
  while (left <= right) {
    // Increment left pointer if the value is less than the pivot
    while (compareFn(array[left], pivot) < 0) left++;
    // Decrement right pointer if the value is more than the pivot
    while (compareFn(array[right], pivot) > 0) right--;
    // Else we swap
    if (left <= right) {
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }
  //return the left pointer
  return left;
}

function quickSort(array, compareFn = defaultCompareFn, left, right) {
  if (left == null) left = 0;
  if (right == null) right = array.length - 1;
  if (array.length > 1) {
    // Get the left pointer returned
    const index = partition(array, compareFn, left, right);
    if (left < index - 1) {
      // More elements on the left side
      quickSort(array, compareFn, left, index - 1);
    }
    if (index < right) {
      // More elements on the right side
      quickSort(array, compareFn, index, right);
    }
  }
  return array;
}

module.exports = {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
};
