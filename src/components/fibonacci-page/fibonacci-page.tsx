import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TDataElement } from "../../types/types";
import { updateElements } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";

export const makeFib = (n: number) => {
  let userNumbers: number[] = [1, 1];
  if (n <= 2) return [1];
  for (let i = 2; i <= n; i++) {
    userNumbers.push(
      userNumbers[userNumbers.length - 1] + userNumbers[userNumbers.length - 2]
    );
  }

  return userNumbers;
};

export const FibonacciPage: React.FC = () => {
  const [production, setProduction] = useState(false);
  const [inputNumber, setInputNumber] = useState<number>(-1);
  const [generatedNumbers, setGeneratedNumbers] = useState<
    (TDataElement | null)[]
  >([]);
  const [isComponentMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const inputNumber = Number(evt.currentTarget.value);
    setInputNumber(inputNumber);
  };

  const generateFibonacci = async () => {
    setProduction(true);
    const fibonacciNumbers = inputNumber ? [...makeFib(inputNumber)] : [];
    const readyNumbers: TDataElement[] = [];
    for (let i = 0; i < fibonacciNumbers.length; i++) {
      readyNumbers.push({
        state: ElementStates.Default,
        value: fibonacciNumbers[i].toString(),
      });
      await updateElements(
        setGeneratedNumbers,
        readyNumbers,
        SHORT_DELAY_IN_MS,
        isComponentMounted
      );
    }
    setProduction(false);
    setInputNumber(-1);
  };

  const handleSubmitButtonClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    generateFibonacci();
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmitButtonClick}>
        <Input
          placeholder="Введите число от 1 до 19"
          type="number"
          min={1}
          isLimitText={true}
          maxLength={2}
          max={19}
          onChange={handleInputChange}
        />
        <Button
          text="Рассчитать"
          type="submit"
          disabled={
            inputNumber
              ? inputNumber > 19 ||
                inputNumber < 1 ||
                !Number.isInteger(inputNumber)
              : true
          }
          isLoader={production}
        />
      </form>
      <ul className={styles.numbers}>
        {generatedNumbers.slice(0, 10).map((number, index) => (
          <Circle
            state={number?.state}
            letter={number?.value.toString()}
            key={index}
            index={index}
          />
        ))}
      </ul>
      <ul className={styles.numbers}>
        {generatedNumbers.slice(10, 20).map((number, index) => (
          <Circle
            state={number?.state}
            letter={number?.value.toString()}
            key={index}
            index={index + 10}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
