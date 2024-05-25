import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { SortAlgorithm, TDataElement } from "../../types/types";
import { swap, updateElements } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";

export const getSelectionSortSteps = (
  arrToSort: (TDataElement | null)[],
  isAscending: boolean
) => {
  const arr = arrToSort ? [...arrToSort] : [];
  const steps: (TDataElement | null)[][] = [];
  if (isAscending) {
    for (let i = 0; i < arr.length - 1; i++) {
      let indToSwap = i;
      arr[i] = {
        ...arr[i],
        state: ElementStates.Changing,
      } as TDataElement;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value < arr[indToSwap]!.value) {
          indToSwap = j;
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[i] = {
        ...arr[i],
        state: ElementStates.Default,
      } as TDataElement;
      swap(arr, i, indToSwap);
      arr[i] = {
        ...arr[i],
        state: ElementStates.Modified,
      } as TDataElement;
    }
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Modified,
    } as TDataElement;
    steps.push([...arr]);
  } else {
    for (let i = 0; i < arr.length - 1; i++) {
      let indToSwap = i;
      arr[i] = {
        ...arr[i],
        state: ElementStates.Changing,
      } as TDataElement;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value > arr[indToSwap]!.value) {
          indToSwap = j;
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[i] = {
        ...arr[i],
        state: ElementStates.Default,
      } as TDataElement;
      swap(arr, i, indToSwap);
      arr[i] = {
        ...arr[i],
        state: ElementStates.Modified,
      } as TDataElement;
    }
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Modified,
    } as TDataElement;
    steps.push([...arr]);
  }
  return steps;
};

export const getBubbleSortSteps = (
  arrToSort: (TDataElement | null)[],
  isAscending: boolean
) => {
  const arr = arrToSort ? [...arrToSort] : [];
  const steps: (TDataElement | null)[][] = [];

  if(arr.length === 0) {
    return [];
  }


  if (isAscending) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value > arr[j + 1]!.value) {
          swap(arr, j, j + 1);
          steps.push([...arr]);
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[arr.length - i - 1] = {
        ...arr[arr.length - i - 1],
        state: ElementStates.Modified,
      } as TDataElement;
      arr[arr.length - 1] = {
        ...arr[arr.length - 1],
        state: ElementStates.Modified,
      } as TDataElement;
      steps.push([...arr]);
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Changing,
        } as TDataElement;
        steps.push([...arr]);
        if (arr[j]!.value < arr[j + 1]!.value) {
          swap(arr, j, j + 1);
          steps.push([...arr]);
        }
        arr[j] = {
          ...arr[j],
          state: ElementStates.Default,
        } as TDataElement;
        arr[j + 1] = {
          ...arr[j + 1],
          state: ElementStates.Default,
        } as TDataElement;
      }
      arr[arr.length - i - 1] = {
        ...arr[arr.length - i - 1],
        state: ElementStates.Modified,
      } as TDataElement;
    }
    arr[arr.length - 1] = {
      ...arr[arr.length - 1],
      state: ElementStates.Modified,
    } as TDataElement;
    steps.push([...arr]);
  }
  return steps;
};

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<(TDataElement | null)[]>([]);
  const [isAscending, setIsAscending] = useState(false);
  const [production, setProduction] = useState(false);
  const [sortAlgorigthm, setSortAlgorithm] = useState<SortAlgorithm | null>(
    null
  );
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSortAlgorithm(SortAlgorithm.selectsort);
    getRandomArray();
    return () => {
      setIsMounted(false);
    };
  }, []);

  const minLen = 3;
  const maxLen = 17;
  const minValue = 0;
  const maxValue = 100;

  const getRandomArray = () => {
    const arrLength = getRandomNumber(minLen, maxLen);
    const randomArray = Array.from({ length: arrLength }, () => ({
      value: getRandomNumber(minValue, maxValue),
      state: ElementStates.Default,
    }));
    setArray([...randomArray]);
  };

  const sortBySelect = async (isAscending: boolean) => {
    const steps = getSelectionSortSteps(array ? [...array] : [], isAscending);
    let i = 0;
    while (i < steps.length) {
      if (steps) {
        await updateElements(
          setArray,
          [...steps[i]],
          SHORT_DELAY_IN_MS,
          isComponentMounted
        );
        i++;
      }
    }
  };

  const sortByBubble = async (isAscending: boolean) => {
    const steps = getBubbleSortSteps(array ? [...array] : [], isAscending);
    let i = 0;
    while (i < steps.length) {
      if (steps) {
        await updateElements(
          setArray,
          [...steps[i]],
          SHORT_DELAY_IN_MS,
          isComponentMounted
        );
        i++;
      }
    }
  };

  const sortArray = async (isAscending: boolean) => {
    setProduction(true);
    if (sortAlgorigthm === SortAlgorithm.selectsort) {
      await sortBySelect(isAscending);
    }
    if (sortAlgorigthm === SortAlgorithm.bubble) {
      await sortByBubble(isAscending);
    }
    setProduction(false);
  };

  const onButtonSortClick = async (direction: Direction) => {
    setProduction(true);
    setIsAscending(direction === Direction.Ascending);
    setIsAscending((state) => {
      sortArray(state);
      return state;
    });
    setProduction(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.page}>
        <div className={styles.radio_buttons}>
          <RadioInput
            name="radio"
            label="Выбор"
            value="selection"
            onChange={() => setSortAlgorithm(SortAlgorithm.selectsort)}
            checked={sortAlgorigthm === SortAlgorithm.selectsort}
          />
          <RadioInput
            name="radio"
            label="Пузырёк"
            value="bubble"
            checked={sortAlgorigthm === SortAlgorithm.bubble}
            onChange={() => setSortAlgorithm(SortAlgorithm.bubble)}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass={`mr-12 ${styles.button_large}`}
            disabled={production}
            isLoader={production && isAscending}
            onClick={() => onButtonSortClick(Direction.Ascending)}
          />
          <Button
            text="По убыванию"
            extraClass={`mr-40 ${styles.button_large}`}
            disabled={production}
            isLoader={production && !isAscending}
            sorting={Direction.Descending}
            onClick={() => onButtonSortClick(Direction.Descending)}
          />
          <Button
            text="Новый массив"
            disabled={production}
            onClick={getRandomArray}
          />
        </div>
      </div>
      <div className={styles.bars}>
        {array?.map((element, index) => (
          <Column
            state={element?.state}
            index={Number(element!.value.toString())}
            key={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
