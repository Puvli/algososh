import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { TDataElement } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { updateElements } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const maxQueueSize = 7;
  const queue = useMemo(() => new Queue<TDataElement>(maxQueueSize), []);
  const initQueueElements = Array.from({ length: maxQueueSize }, () => ({
    value: "",
    state: ElementStates.Default,
  }));
  const [inputValue, setInputValue] = useState("");
  const [queueElements, setQueueElements] =
    useState<(TDataElement | null)[]>(initQueueElements);
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
    let tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.isTail = false;
    }
    if (queue.isEmpty()) {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Changing,
        isHead: true,
        isTail: true,
      });
    } else {
      queue.enqueue({
        value: inputValue,
        state: ElementStates.Changing,
        isHead: false,
        isTail: true,
      });
    }
    await updateElements(
      setQueueElements,
      [...queue.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    tail = queue.getTailElement();
    if (tail?.value) {
      tail.value.state = ElementStates.Default;
    }
    await updateElements(
      setQueueElements,
      [...queue.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProductionAdd(false);
    setInputValue("");
  };

  const handleDelete = async () => {
    setProductionDelete(true);
    let head = queue.getHeadElement();
    let tail = queue.getTailElement();
    if (!queue.isEmpty() && head?.value) {
      head.value.state = ElementStates.Changing;
      await updateElements(
        setQueueElements,
        [...queue.getElements()],
        SHORT_DELAY_IN_MS,
        isComponentMounted
      );
      head.value.isHead = false;
      queue.dequeue();
    }
    if (head?.index === tail?.index) {
      queue.clear();
    }
    head = queue.getHeadElement();
    if (!queue.isEmpty() && head?.value) {
      head.value.isHead = true;
      setQueueElements([...queue.getElements()]);
    }
    await updateElements(
      setQueueElements,
      [...queue.getElements()],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    if (head?.value) {
      head.value.state = ElementStates.Default;
    }
    setQueueElements([...queue.getElements()]);
    setProductionDelete(false);
    setInputValue("");
  };

  const handleClear = async () => {
    setProductionClear(true);
    queue.clear();
    await updateElements(
      setQueueElements,
      [...initQueueElements],
      SHORT_DELAY_IN_MS,
      isComponentMounted
    );
    setProductionClear(false);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.page}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText={true}
          onChange={handleInputChange}
          data-testid="input"
        />
        <Button
          disabled={
            productionAdd ||
            inputValue.length === 0 ||
            queueElements.length > maxQueueSize
          }
          text="Добавить"
          onClick={handleAdd}
          isLoader={productionAdd}
          data-testid="add"
        />
        <Button
          disabled={productionDelete || queue.isEmpty()}
          text="Удалить"
          extraClass={"mr-40"}
          onClick={handleDelete}
          isLoader={productionDelete}
          data-testid="delete"
        />
        <Button
          disabled={productionClear || queue.isEmpty()}
          text="Очистить"
          onClick={handleClear}
          isLoader={productionClear}
          data-testid="clear"
        />
      </div>
      <ul className={styles.queue} data-testid="queue-elements">
        {queueElements.map((element: TDataElement | null, index: number) => (
          <Circle
            key={index}
            state={element?.state}
            letter={element?.value.toString()}
            head={element?.isHead ? "head" : ""}
            tail={element?.isTail ? "tail" : ""}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
