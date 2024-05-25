import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { DELAY_IN_MS } from "../../constants/delays";
import React, { FC, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { updateElements } from "../../utils/utils";
import styles from "./string.module.css";
import { TDataElement } from "../../types/types";
import { swap } from "../../utils/utils";

export const getIterates = (sourceString: string): string[][] | string => {
  const iterates: string[][] = [];
  const letters = sourceString.split("");
  let start = 0;
  let end = letters.length - 1;

  if (sourceString.length === 0) {
    return sourceString;
  }

  while (start <= end) {
    if (end === start) {
      iterates.push([...letters]);
      break;
    } else {
      swap(letters, start, end);
      iterates.push([...letters]);
      start++;
      end--;
    }
  }

  return iterates;
};

export const StringComponent: FC = () => {
  const [inputString, setInputString] = useState("");
  const [letters, setLetters] = useState<(TDataElement | null)[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputString(evt.currentTarget.value);
  };

  const reverseString = async () => {
    setInProgress(true);
    const inputLetters: TDataElement[] = [];
    inputString.split("").forEach((element) => {
      inputLetters.push({ value: element, state: ElementStates.Default });
    });

    const iterates = getIterates(inputString);
    let i = 0;
    while (i < iterates.length) {
      if (iterates) {
        await updateElements(
          setLetters,
          [...inputLetters],
          DELAY_IN_MS,
          isComponentMounted
        );
        let leftIndex = i;
        let rightIndex = inputLetters.length - i - 1;
        inputLetters[leftIndex].state = ElementStates.Changing;
        inputLetters[rightIndex].state = ElementStates.Changing;
        await updateElements(
          setLetters,
          [...inputLetters],
          DELAY_IN_MS,
          isComponentMounted
        );
        inputLetters[leftIndex].state = ElementStates.Modified;
        inputLetters[rightIndex].state = ElementStates.Modified;
        inputLetters[leftIndex].value = iterates[i][leftIndex];
        inputLetters[rightIndex].value = iterates[i][rightIndex];
        i++;
      }
    }
    setInputString("");
    setInProgress(false);
  };

  const handleSubmitButton = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    reverseString();
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmitButton}>
        <Input
          value={inputString}
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
          data-testid="input"
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={inProgress}
          disabled={!inputString}
          data-testid="button"
        />
      </form>
      <ul className={styles.letters} data-testid="result">
        {letters.map((letter, index) => (
          <Circle
            state={letter?.state}
            letter={letter?.value.toString()}
            key={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
