import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../components/Card";
import ConfigurationContext from "../Context/ConfigurationContext";

describe("Card", () => {
  const configuration = {
    configuration: { showColors: true, slotsPerPage: 9, cardCondition: false },
    setConfiguration: () => {},
  };
  it("renders the card with the correct background color", () => {
    render(
      <ConfigurationContext.Provider value={configuration}>
        <Card name="Test Card" colorType="White" dark={false} />
      </ConfigurationContext.Provider>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("bg-cream-200");
  });

  it("renders the card with the default background color when the color type is not recognized", () => {
    render(
      <ConfigurationContext.Provider value={configuration}>
        <Card name="Test Card" colorType="Unknown" dark={false} />
      </ConfigurationContext.Provider>
    );
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("bg-white");
  });
});
