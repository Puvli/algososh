import { getBubbleSortSteps, getSelectionSortSteps } from "./sorting-page";
import { ElementStates } from "../../types/element-states";

const convertStepsToValues = (steps) =>
  steps.map((step) => step.map((element) => (element ? element.value : null)));

describe("Проверяем сортировки на пустом массиве", () => {
  it("Пустой массив в сортировке выбором и пузырьком", () => {
    const inputArray = [];

    const selectionSortAscendingResult = getSelectionSortSteps(
      inputArray,
      true
    );
    const selectionSortDescendingResult = getSelectionSortSteps(
      inputArray,
      false
    );

    const bubbleSortAscendingResult = getBubbleSortSteps(inputArray, true);
    const bubbleSortDescendingResult = getBubbleSortSteps(inputArray, false);

    expect(convertStepsToValues(selectionSortAscendingResult).pop()).toEqual(
      []
    );
    expect(convertStepsToValues(selectionSortDescendingResult).pop()).toEqual(
      []
    );
    expect(bubbleSortAscendingResult).toEqual([]);
    expect(bubbleSortDescendingResult).toEqual([]);
  });

  it("Проверяем сортировку из одного элемента", () => {
    const inputArray = [{ value: 1, state: ElementStates.Default }];
    const expectedValues = [1]; // Ожидаемый результат после преобразования

    const selectionSortAscendingResult = getSelectionSortSteps(
      inputArray,
      true
    );
    const selectionSortDescendingResult = getSelectionSortSteps(
      inputArray,
      false
    );

    const bubbleSortAscendingResult = getBubbleSortSteps(inputArray, true);
    const bubbleSortDescendingResult = getBubbleSortSteps(inputArray, false);

    expect(convertStepsToValues(selectionSortAscendingResult).pop()).toEqual(
      expectedValues
    );
    expect(convertStepsToValues(selectionSortDescendingResult).pop()).toEqual(
      expectedValues
    );
    expect(convertStepsToValues(bubbleSortAscendingResult).pop()).toEqual(
      expectedValues
    );
    expect(convertStepsToValues(bubbleSortDescendingResult).pop()).toEqual(
      expectedValues
    );
  });

  it("Проверяем сортировку массива из нескольких элементов", () => {
    const inputArray = [
      { value: 3, state: ElementStates.Default },
      { value: 1, state: ElementStates.Default },
      { value: 2, state: ElementStates.Default },
    ];
    const expectedValuesAscending = [1, 2, 3]; // Ожидаемый результат после сортировки по возрастанию
    const expectedValuesDescending = [3, 2, 1]; // Ожидаемый результат после сортировки по убыванию

    const selectionSortAscendingResult = getSelectionSortSteps(
      inputArray,
      true
    );
    const selectionSortDescendingResult = getSelectionSortSteps(
      inputArray,
      false
    );

    const bubbleSortAscendingResult = getBubbleSortSteps(inputArray, true);
    const bubbleSortDescendingResult = getBubbleSortSteps(inputArray, false);

    expect(convertStepsToValues(selectionSortAscendingResult).pop()).toEqual(
      expectedValuesAscending
    );
    expect(convertStepsToValues(selectionSortDescendingResult).pop()).toEqual(
      expectedValuesDescending
    );
    expect(convertStepsToValues(bubbleSortAscendingResult).pop()).toEqual(
      expectedValuesAscending
    );
    expect(convertStepsToValues(bubbleSortDescendingResult).pop()).toEqual(
      expectedValuesDescending
    );
  });
});
