const {
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
  // sort,
} = require("./arrayMethods");

// const forEach = (a, ...args) => a.forEach(...args);
// const map = (a, ...args) => a.map(...args);
// const filter = (a, ...args) => a.filter(...args);
// const reduce = (a, ...args) => a.reduce(...args);
// const some = (a, ...args) => a.some(...args);
// const every = (a, ...args) => a.every(...args);
// const flat = (a, ...args) => a.flat(...args);
// const find = (a, ...args) => a.find(...args);
// const includes = (a, ...args) => a.includes(...args);
// const findIndex = (a, ...args) => a.findIndex(...args);
const sort = (a, ...args) => a.sort(...args);

it("forEach", () => {
  const func = jest.fn();
  const startingArray = ["a", "b", "c"];
  forEach(startingArray, func);

  expect(func).toHaveBeenNthCalledWith(1, "a", 0, startingArray);
  expect(func).toHaveBeenNthCalledWith(2, "b", 1, startingArray);
  expect(func).toHaveBeenNthCalledWith(3, "c", 2, startingArray);
  expect(func).toHaveBeenCalledTimes(3);
});

it("map", () => {
  const func = jest.fn((elem, index) => index * 2);
  const startingArray = ["a", "b", "c"];
  const newArray = map(startingArray, func);

  expect(newArray).toEqual([0, 2, 4]);
  expect(func).toHaveBeenNthCalledWith(1, "a", 0, startingArray);
  expect(func).toHaveBeenNthCalledWith(2, "b", 1, startingArray);
  expect(func).toHaveBeenNthCalledWith(3, "c", 2, startingArray);
  expect(func).toHaveBeenCalledTimes(3);
});

it("filter", () => {
  const func = jest.fn((elem, index) => elem === "b" || index === 2);
  const startingArray = ["a", "b", "c"];
  const newArray = filter(startingArray, func);

  expect(newArray).toEqual(["b", "c"]);
  expect(func).toHaveBeenNthCalledWith(1, "a", 0, startingArray);
  expect(func).toHaveBeenNthCalledWith(2, "b", 1, startingArray);
  expect(func).toHaveBeenNthCalledWith(3, "c", 2, startingArray);
  expect(func).toHaveBeenCalledTimes(3);
});

describe("reduce", () => {
  it("with a starting value", () => {
    const func = jest.fn((sum, elem) => sum + elem);
    const startingArray = [5, 3, 7];
    const total = reduce(startingArray, func, 4);

    expect(total).toEqual(19);
    expect(func).toHaveBeenNthCalledWith(1, 4, 5, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 9, 3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, 12, 7, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });

  it("with no starting value", () => {
    const func = jest.fn((sum, elem) => sum + elem);
    const startingArray = [5, 3, 7];
    const total = reduce(startingArray, func);

    expect(total).toEqual(15);
    expect(func).toHaveBeenNthCalledWith(1, 5, 3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 8, 7, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe("some", () => {
  it("with a truthy value", () => {
    const func = jest.fn((elem, index) => elem > 0);
    const startingArray = [-4, 3, 6];
    const result = some(startingArray, func);

    expect(result).toEqual(true);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it("with no truthy value", () => {
    const func = jest.fn((elem, index) => elem > 0);
    const startingArray = [-4, -3, -6];
    const result = some(startingArray, func);

    expect(result).toEqual(false);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe("every", () => {
  it("with a falsey value", () => {
    const func = jest.fn((elem, index) => elem < 0);
    const startingArray = [-4, 3, 6];
    const result = every(startingArray, func);

    expect(result).toEqual(false);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it("with no falsey value", () => {
    const func = jest.fn((elem, index) => elem < 0);
    const startingArray = [-4, -3, -6];
    const result = every(startingArray, func);

    expect(result).toEqual(true);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe("flat", () => {
  it("with no value passed", () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(startingArray);

    expect(result).toEqual([1, 2, 3, 4, [5, 6, [7, 8]]]);
  });

  it("with a value passed", () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(startingArray, 2);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, [7, 8]]);
  });

  it("with infinite passed", () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]];
    const result = flat(startingArray, Number.POSITIVE_INFINITY);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("find", () => {
  it("with a truthy value", () => {
    const func = jest.fn((elem, index) => elem > 0);
    const startingArray = [-4, 3, 6];
    const result = find(startingArray, func);

    expect(result).toEqual(3);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it("with no truthy value", () => {
    const func = jest.fn((elem, index) => elem > 0);
    const startingArray = [-4, -3, -6];
    const result = find(startingArray, func);

    expect(result).toEqual(undefined);
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe("includes", () => {
  const startingArray = [1, 2, 3, 4, 5, 6, 7, 8];

  it("does find with no fromIndex", () => {
    const result = includes(startingArray, 5);

    expect(result).toEqual(true);
  });

  it("does find with a fromIndex", () => {
    const result = includes(startingArray, 5, 3);

    expect(result).toEqual(true);
  });

  it("does not find with no fromIndex", () => {
    const result = includes(startingArray, 9);

    expect(result).toEqual(false);
  });

  it("does not find with a fromIndex", () => {
    const result = includes(startingArray, 3, 6);

    expect(result).toEqual(false);
  });
});

describe("findIndex", () => {
  it("with a truthy value", () => {
    const func = jest.fn((elem, index) => elem === 4);
    const startingArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = findIndex(startingArray, func);

    expect(result).toEqual(3);
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, 3, 2, startingArray);
    expect(func).toHaveBeenNthCalledWith(4, 4, 3, startingArray);
    expect(func).toHaveBeenCalledTimes(4);
  });

  it("with no truthy value", () => {
    const func = jest.fn((elem, index) => elem === 9);
    const startingArray = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = findIndex(startingArray, func);

    expect(result).toEqual(-1);
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray);
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray);
    expect(func).toHaveBeenNthCalledWith(3, 3, 2, startingArray);
    expect(func).toHaveBeenNthCalledWith(4, 4, 3, startingArray);
    expect(func).toHaveBeenNthCalledWith(5, 5, 4, startingArray);
    expect(func).toHaveBeenNthCalledWith(6, 6, 5, startingArray);
    expect(func).toHaveBeenNthCalledWith(7, 7, 6, startingArray);
    expect(func).toHaveBeenNthCalledWith(8, 8, 7, startingArray);
    expect(func).toHaveBeenCalledTimes(8);
  });
});

describe("sort", () => {
  const startingArray = [4, 5, 3, 8, 1, 0, 7, 6, 9, 2];
  const startingArray2 = [
    "cat",
    "eagle",
    "dog",
    "apple",
    "bus",
    "zoo",
    "orange",
  ];

  it("omits compareFn", () => {
    const result = sort(startingArray);
    const result2 = sort(startingArray2);

    expect(result).toBe(startingArray);
    expect(result2).toBe(startingArray2);

    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(result2).toEqual([
      "apple",
      "bus",
      "cat",
      "dog",
      "eagle",
      "orange",
      "zoo",
    ]);
  });

  it("with compareFn", () => {
    const func = jest.fn((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      if (a === b) return 0;
    });

    const result = sort(startingArray, func);
    const result2 = sort(startingArray2, func);

    expect(result).toBe(startingArray);
    expect(result2).toBe(startingArray2);

    expect(result).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    expect(result2).toEqual([
      "zoo",
      "orange",
      "eagle",
      "dog",
      "cat",
      "bus",
      "apple",
    ]);
  });
});
