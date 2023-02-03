import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumberInput from "../components/NumberInput";

describe("number input component", () => {
  const initialTestValue = 1;
  let testValue = initialTestValue;
  const setTestValue = (value: number) => {
    testValue = value;
  };
  afterEach(() => {
    testValue = initialTestValue;
  });
  test("clicking the increment button increases the value by the step", () => {
    const step = Number(Math.random().toFixed(2));
    render(
      <NumberInput
        min={0}
        max={3}
        value={testValue}
        step={step}
        handler={setTestValue}
      />
    );
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);

    const expectedValue = Number((initialTestValue + step).toFixed(2));
    expect(testValue).toEqual(expectedValue);
  });
  test("clicking the decrement button decreases the value by the step", () => {
    const step = Number(Math.random().toFixed(2));
    render(
      <NumberInput
        min={0}
        max={3}
        value={testValue}
        step={step}
        handler={setTestValue}
      />
    );
    const decrementButton = screen.getByText("-");
    fireEvent.click(decrementButton);

    const expectedValue = Number((initialTestValue - step).toFixed(2));
    expect(testValue).toEqual(expectedValue);
  });
  test("incrementing past the maximum value sets the value to maximum", () => {
    const step = 3;
    const max = 3;
    render(
      <NumberInput
        min={0}
        max={max}
        value={testValue}
        step={step}
        handler={setTestValue}
      />
    );
    const incrementButton = screen.getByText("+");
    
    fireEvent.click(incrementButton);
    expect(testValue).toEqual(max);
  });
  test("decrementing past the minimum value sets the value to minimum", () => {
    const step = 3;
    const min = 0;
    render(
      <NumberInput
        min={min}
        max={3}
        value={testValue}
        step={step}
        handler={setTestValue}
      />
    );
    const decrementButton = screen.getByText("-");
    
    fireEvent.click(decrementButton);
    expect(testValue).toEqual(min);
  })
  test("typing a value higher than max sets the value to maximum", () => {
    const targetValue = 45;
    const max = 3;
    render(
      <NumberInput
        min={0}
        max={max}
        value={testValue}
        step={1}
        handler={setTestValue}
        label="test"
      />
    );
    const input = screen.getByLabelText("test")
    fireEvent.change(input, {target: {value: targetValue}})
    expect(testValue).toEqual(max);
  })
  test("typing a value lower than min sets the value to minimum", () => {
    const targetValue = -45;
    const min = 0;
    render(
      <NumberInput
        min={min}
        max={3}
        value={testValue}
        step={1}
        handler={setTestValue}
        label="test"
      />
    );
    const input = screen.getByLabelText("test")
    fireEvent.change(input, {target: {value: targetValue}})
    expect(testValue).toEqual(min);
  })
});
