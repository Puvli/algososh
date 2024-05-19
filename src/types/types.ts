import { ElementStates } from "./element-states";

export type TDataElement = {
  value: string | number;
  state: ElementStates;
  pos?: boolean;
  valueToChange?: string | number;
  isHead?: boolean;
  isTail?: boolean;
  isLinked?: boolean;
};

export enum SortAlgorithm {
  selectsort = "выбором",
  bubble = "пузырьком",
}
