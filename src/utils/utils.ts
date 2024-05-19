import { TDataElement } from "../types/types";

export const swap = <T>(arr: T[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const updateElements = async (
  setState: (elements: (TDataElement | null)[]) => void,
  elements: (TDataElement | null)[],
  delay: number,
  isComponentMounted: boolean,
) => {
  await sleep(delay);
  if (isComponentMounted) {
    setState([...elements]);
  }
};