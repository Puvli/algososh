import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { Button } from "../button/button";
import { ElementStates } from "../../../types/element-states";

const TEST_SNAPSHOT_CIRCLE_WITHOUT_LETTER = "Рендер круга без буквы";
const TEST_SNAPSHOT_CIRCLE_WITH_LETTERS = "Рендер круга c буквами";
const TEST_SNAPSHOT_CIRCLE_WITH_HEAD = "Рендер круга c head";
const TEST_SNAPSHOT_CIRCLE_WITH_HEAD_REACT = "Рендер круга c head react";
const TEST_SNAPSHOT_CIRCLE_WITH_TAIL = "Рендер круга c tail";
const TEST_SNAPSHOT_CIRCLE_WITH_TAIL_REACT = "Рендер круга c tail react";
const TEST_SNAPSHOT_CIRCLE_WITH_INDEX = "Рендер круга c index";
const TEST_SNAPSHOT_CIRCLE_WITH_SMALL = "Рендер круга c small";
const TEST_SNAPSHOT_CIRCLE_WITH_DEFAULT = "Рендер круга c default";
const TEST_SNAPSHOT_CIRCLE_WITH_CHANGING = "Рендер круга c changing";
const TEST_SNAPSHOT_CIRCLE_WITH_MODIFIED = "Рендер круга c modified";

describe("Проверяем circle", () => {
  it(TEST_SNAPSHOT_CIRCLE_WITHOUT_LETTER, () => {
    const tree = renderer.create(<Circle letter="" />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITHOUT_LETTER);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_LETTERS, () => {
    const tree = renderer.create(<Circle letter="Сбукавами" />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_LETTERS);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_HEAD, () => {
    const tree = renderer.create(<Circle head="Check" />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_HEAD);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_HEAD_REACT, () => {
    const tree = renderer
      .create(
        <Circle
          head={<Button type="button" text="Test with react-element" />}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_HEAD_REACT);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_TAIL, () => {
    const tree = renderer.create(<Circle tail="test tail" />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_TAIL);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_TAIL_REACT, () => {
    const tree = renderer
      .create(
        <Circle
          tail={<Button type="button" text="Test with react-element" />}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_TAIL_REACT);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_INDEX, () => {
    const tree = renderer.create(<Circle index={34} />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_INDEX);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_SMALL, () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_SMALL);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_DEFAULT, () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_DEFAULT);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_CHANGING, () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_CHANGING);
  });

  it(TEST_SNAPSHOT_CIRCLE_WITH_MODIFIED, () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot(TEST_SNAPSHOT_CIRCLE_WITH_MODIFIED);
  });
});
