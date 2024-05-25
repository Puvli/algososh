import { getIterates } from "./string";

const TEST_STRING_EVEN = "Четное количество символов";
const TEST_STRING_ODD = "Нечетное количество символов";
const TEST_STRING_SINGLE = "Один символ в строке";
const TEST_STRING_EMPTY = "Пустая строка";

describe("Проверяем разворот строки", () => {
  it(TEST_STRING_EVEN, () => {
    const iterates = getIterates("test");
    const reversedString = iterates[iterates.length - 1].join("");
    expect(reversedString).toEqual("tset");
  });

  it(TEST_STRING_ODD, () => {
    const iterates = getIterates("tests");
    const reversedString = iterates[iterates.length - 1].join("");
    expect(reversedString).toEqual("stset");
  });

  it(TEST_STRING_SINGLE, () => {
    const iterates = getIterates("1");
    const reversedString = iterates[iterates.length - 1].join("");
    expect(reversedString).toEqual("1");
  });

  it(TEST_STRING_EMPTY, () => {
    const iterates = getIterates(" ");
    const reversedString = iterates[iterates.length - 1].join("");
    expect(reversedString).toEqual(" ");
  });
});
