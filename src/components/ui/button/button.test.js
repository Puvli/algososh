import renderer from "react-test-renderer";
import { Button } from "./button";
import { render, fireEvent, getByTestId } from "@testing-library/react";

const TEST_SNAPSHOT_BUTTON_WITH_TEXT = "Рендер кнопки с текстом";
const TEST_SNAPSHOT_BUTTON_WITHOUT_TEXT = "Рендер кнопки без текстом";
const TEST_SNAPSHOT_BUTTON_DISABLED = "Рендер заблокированной кнопки";
const TEST_SNAPSHOT_BUTTON_WITH_LOADER = "Рендер кнопки с загрузкой";

const TEST_BUTTON_CLICK = "Вызов колбэка при клике на кнопку";

describe("Проверяем button", () => {
  it(TEST_SNAPSHOT_BUTTON_WITH_TEXT, () => {
    const tree = renderer.create(<Button text={"Развернуть"} />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_WITH_TEXT);
  });

  it(TEST_SNAPSHOT_BUTTON_WITHOUT_TEXT, () => {
    const tree = renderer.create(<Button text={""} />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_WITHOUT_TEXT);
  });

  it(TEST_SNAPSHOT_BUTTON_DISABLED, () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_DISABLED);
  });

  it(TEST_SNAPSHOT_BUTTON_WITH_LOADER, () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_BUTTON_WITH_LOADER);
  });

  it(TEST_BUTTON_CLICK, () => {
    const callback = jest.fn();

    const { container } = render(
      <Button data-testid="button" onClick={callback()} />
    );

    const button = getByTestId(container, "button");

    fireEvent.click(button);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
