import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TDataElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { updateElements } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { LinkedList } from "./list";

export const ListPage: React.FC = () => {
  const initListElements = useMemo(() => ["0", "34", "8", "1"], []);
  const list = useMemo(
    () => new LinkedList<string | number>(initListElements),
    [initListElements]
  );
  const initList: TDataElement[] = useMemo(() => [], []);
  const [inputValue, setInputValue] = useState("");
  const [isAddingByIndex, setIsAddingByIndex] = useState(false);
  const [isDeletingByIndex, setIsDeletingByIndex] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);
  const [inputIndex, setInputIndex] = useState<number>(-1);
  const [listElements, setListElements] = useState<(TDataElement | null)[]>([]);
  const [production, setProduction] = useState(false);
  const [isAddingHead, setIsAddingHead] = useState(false);
  const [isDeletingHead, setIsDeletingHead] = useState(false);
  const [isAddingTail, setIsAddingTail] = useState(false);
  const [isDeletingTail, setIsDeletingTail] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    initListElements.forEach((element) => {
      initList.push({
        value: element,
        state: ElementStates.Default,
        isHead: false,
        isTail: false,
        isLinked: true,
      });
    });
    initList[0].isHead = true;
    initList[initList.length - 1].isTail = true;
    initList[initList.length - 1].isLinked = false;
    setListElements(initList);
    return () => {
      setIsMounted(false);
    };
  }, [initList, initListElements, list]);

  const handleInputValueChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);
  };

  const handleInputIndexChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputIndex(Number(evt.currentTarget.value));
  };

  const handleAddToHead = async () => {
    setProduction(true);
    setIsAddingHead(true);
    listElements[0]!.isHead = false;
    listElements[0]!.isLinked = true;
    listElements[0]!.pos = true;
    listElements[0]!.valueToChange = inputValue;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    listElements[0]!.pos = false;
    list.prepend(inputValue);
    const head = list.getNodeByIndex(0);
    listElements.unshift({
      value: head ? head : "",
      isHead: true,
      isTail: false,
      isLinked: true,
      state: ElementStates.Modified,
    });
    setListElements([...listElements]);
    listElements[0]!.state = ElementStates.Default;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProduction(false);
    setIsAddingHead(false);
    setInputIndex(-1);
    setInputValue("");
  };

  const handleAddToTail = async () => {
    setProduction(true);
    setIsAddingTail(true);
    let indexOfTail = list.getSize() - 1;
    if (indexOfTail === 0) {
      listElements[indexOfTail]!.isHead = false;
    }
    listElements[indexOfTail]!.isTail = false;
    listElements[indexOfTail]!.pos = true;
    listElements[indexOfTail]!.valueToChange = inputValue;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    listElements[indexOfTail]!.pos = false;
    listElements[indexOfTail]!.isLinked = true;
    listElements[0]!.isHead = true;
    list.append(inputValue);
    indexOfTail = list.getSize() - 1;
    const tail = list.getNodeByIndex(indexOfTail);
    listElements.push({
      value: tail ? tail : "",
      state: ElementStates.Modified,
      isTail: true,
      isLinked: false,
    });
    setListElements([...listElements]);
    indexOfTail = list.getSize() - 1;
    listElements[indexOfTail]!.state = ElementStates.Default;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProduction(false);
    setIsAddingTail(false);
    setInputIndex(-1);
    setInputValue("");
  };

  const handleDeleteHead = async () => {
    setProduction(true);
    setIsDeletingHead(true);
    listElements[0]!.pos = true;
    listElements[0]!.valueToChange = listElements[0]!.value;
    listElements[0]!.value = "";
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    listElements[0]!.pos = false;
    list.deleteHead();
    listElements.shift();
    listElements[0]!.isHead = true;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProduction(false);
    setIsDeletingHead(false);
    setInputIndex(-1);
    setInputValue("");
  };

  const handleDeleteTail = async () => {
    setProduction(true);
    setIsDeletingTail(true);
    listElements[list.getSize() - 1]!.pos = true;
    listElements[list.getSize() - 1]!.valueToChange =
      listElements[list.getSize() - 1]!.value;
    listElements[list.getSize() - 1]!.value = "";
    listElements[list.getSize() - 1]!.isTail = false;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    listElements[list.getSize() - 1]!.pos = false;
    list.deleteTail();
    listElements.pop();
    listElements[list.getSize() - 1]!.isTail = true;
    listElements[list.getSize() - 1]!.isLinked = false;
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProduction(false);
    setIsDeletingTail(false);
    setInputIndex(-1);
    setInputValue("");
  };

  const handleAddByIndex = async () => {
    setProduction(true);
    setIsAddingByIndex(true);
    list.addByIndex(inputIndex, inputValue);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i]!.state = ElementStates.Changing;
      listElements[i]!.pos = true;
      listElements[i]!.valueToChange = inputValue;
      listElements[i]!.isHead = false;
      await updateElements(
        setListElements,
        [...listElements],
        SHORT_DELAY_IN_MS,
        isComponentMounted
      );
      listElements[i]!.pos = false;
      if (inputIndex !== 0) {
        listElements[0]!.isHead = true;
      }
    }
    const insertedNode = list.getNodeByIndex(inputIndex);
    listElements.splice(inputIndex, 0, {
      value: insertedNode ? insertedNode : "",
      state: ElementStates.Modified,
      isLinked: true,
    });
    listElements[0]!.isHead = true;
    listElements[list.getSize() - 1]!.isTail = true;
    setListElements([...listElements]);
    for (let i = 0; i <= inputIndex + 1; i++) {
      listElements[i]!.state = ElementStates.Default;
    }
    await updateElements(
      setListElements,
      [...listElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProduction(false);
    setIsAddingByIndex(false);
    setInputIndex(-1);
    setInputValue("");
  };

  const handleDeleteByIndex = async () => {
    setProduction(true);
    setIsDeletingByIndex(true);
    list.deleteByIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listElements[i]!.pos = true;
      listElements[i]!.isTail = false;
      setListElements([...listElements]);
      if (i === inputIndex) {
        listElements[i]!.state = ElementStates.Default;
        const value = listElements[i]!.value;
        listElements[i]!.value = "";
        listElements[i]!.valueToChange = value;
        await updateElements(
          setListElements,
          [...listElements],
          SHORT_DELAY_IN_MS,
          isComponentMounted
        );
      } else {
        listElements[i]!.state = ElementStates.Changing;
      }
      await updateElements(
        setListElements,
        [...listElements],
        SHORT_DELAY_IN_MS,
        isComponentMounted
      );
      listElements[i]!.pos = false;
      setListElements([...listElements]);
    }
    listElements.splice(inputIndex, 1);
    listElements[0]!.isHead = true;
    listElements[list.getSize() - 1]!.isTail = true;
    listElements[list.getSize() - 1]!.isLinked = false;
    setListElements([...listElements]);
    for (let i = 0; i < inputIndex; i++) {
      listElements[i]!.state = ElementStates.Default;
    }
    setProduction(false);
    setIsDeletingByIndex(false);
    setInputIndex(-1);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.page}>
        <div className={styles.inputs}>
          <Input
            placeholder="Введите значение"
            min={1}
            value={inputValue}
            maxLength={4}
            extraClass={styles.input}
            disabled={production}
            onChange={handleInputValueChange}
            isLimitText={true}
            data-testid="valueInput"
          />
          <Button
            text="Добавить в head"
            onClick={handleAddToHead}
            disabled={(production && !isAddingHead) || inputValue.length === 0}
            extraClass={styles.small_button}
            isLoader={isAddingHead}
            data-testid="addToHead"
          />
          <Button
            text="Добавить в tail"
            onClick={handleAddToTail}
            disabled={(production && !isAddingTail) || inputValue.length === 0}
            extraClass={styles.small_button}
            isLoader={isAddingTail}
            data-testid="addToTail"
          />
          <Button
            text="Удалить из head"
            onClick={handleDeleteHead}
            disabled={list.isEmpty() || list.getSize() < 2}
            extraClass={styles.small_button}
            isLoader={isDeletingHead}
            data-testid="deleteFromHead"
          />
          <Button
            text="Удалить из tail"
            onClick={handleDeleteTail}
            disabled={list.isEmpty() || list.getSize() < 2}
            extraClass={styles.small_button}
            isLoader={isDeletingTail}
            data-testid="deleteFromTail"
          />
        </div>
        <div className={styles.inputs}>
          <Input
            type="number"
            extraClass={styles.input}
            value={inputIndex >= 0 ? inputIndex : ""}
            onChange={handleInputIndexChange}
            disabled={production}
            placeholder="Введите индекс"
            data-testid="indexInput"
          />
          <Button
            text="Добавить по индексу"
            onClick={handleAddByIndex}
            isLoader={isAddingByIndex}
            disabled={
              inputIndex < 0 ||
              inputIndex >= list.getSize() ||
              inputValue.length === 0
            }
            extraClass={styles.large_button}
            data-testid="addByIndex"
          />
          <Button
            onClick={handleDeleteByIndex}
            isLoader={isDeletingByIndex}
            disabled={
              inputIndex < 0 || list.isEmpty() || inputIndex >= list.getSize()
            }
            text="Удалить по индексу"
            extraClass={styles.large_button}
            data-testid="deleteByIndex"
          />
        </div>
      </div>
      <ul className={styles.list} data-testid="list-elements">
        {listElements.map((element, index) => (
          <li className={styles.circle} key={index}>
            {(isAddingHead || isAddingTail || isAddingByIndex) &&
              element?.pos && (
                <Circle
                  state={ElementStates.Changing}
                  letter={element?.valueToChange?.toString()}
                  isSmall={true}
                  extraClass={styles.add}
                />
              )}
            <Circle
              state={element?.state}
              extraClass={"mr-6 ml-6"}
              letter={element?.value.toString()}
              head={element?.isHead ? "head" : ""}
              tail={element?.isTail ? "tail" : ""}
              index={index}
            />
            {(isDeletingHead || isDeletingTail) && element?.pos && (
              <Circle
                isSmall={true}
                extraClass={styles.delete}
                state={ElementStates.Changing}
                letter={element?.valueToChange?.toString()}
              />
            )}
            {isDeletingByIndex && index === inputIndex && element?.pos && (
              <Circle
                isSmall={true}
                extraClass={styles.delete}
                state={ElementStates.Changing}
                letter={element?.valueToChange?.toString()}
              />
            )}
            {element?.isLinked && !element?.isTail && (
              <ArrowIcon
                fill={
                  element?.state === ElementStates.Changing
                    ? "#d252e1"
                    : "#0032FF"
                }
              />
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
