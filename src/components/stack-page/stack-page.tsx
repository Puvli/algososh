import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TDataElement } from "../../types/types";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { updateElements } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";

const stack = new Stack<TDataElement>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stackElements, setStackElements] = useState<(TDataElement | null)[]>(
    []
  );
  const [productionAdd, setProductionAdd] = useState(false);
  const [productionDelete, setProductionDelete] = useState(false);
  const [productionClear, setProductionClear] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleAdd = async () => {
    setProductionAdd(true);
    let last = stack.peak();
    if (!stack.isEmpty() && last) {
      last.isHead = false;
    }
    stack.push({
      value: inputValue,
      state: ElementStates.Changing,
      isHead: true,
    });
    await updateElements(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    last = stack.peak();
    if (!stack.isEmpty() && last) {
      last.state = ElementStates.Default;
    }
    await updateElements(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProductionAdd(false);
    setInputValue("");
  };

  const handleDelete = async () => {
    setProductionDelete(true);
    let last = stack.peak();
    if (!stack.isEmpty() && last) {
      last.state = ElementStates.Changing;
    }
    await updateElements(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    stack.pop();
    last = stack.peak();
    if (!stack.isEmpty() && last) {
      last.state = ElementStates.Default;
      last.isHead = true;
    }
    await updateElements(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProductionDelete(false);
  };

  const handleClear = async () => {
    setProductionClear(true);
    stack.clear();
    await updateElements(
      setStackElements,
      [...stack.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProductionClear(false);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.page}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={handleInputChange}
        />
        <Button
          disabled={
            productionAdd || inputValue.length === 0 || stackElements.length > 9
          }
          text="Добавить"
          onClick={handleAdd}
          isLoader={productionAdd}
        />
        <Button
          disabled={productionDelete || stackElements.length === 0}
          text="Удалить"
          extraClass={"mr-40"}
          onClick={handleDelete}
          isLoader={productionDelete}
        />
        <Button
          disabled={productionClear || stackElements.length === 0}
          text="Очистить"
          onClick={handleClear}
          isLoader={productionClear}
        />
      </div>
      <ul className={styles.stack}>
        {stackElements.map((element: TDataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? "top" : ""}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
