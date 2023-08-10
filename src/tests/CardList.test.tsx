import { render, screen, fireEvent } from "@testing-library/react";
import { MTGCard } from "../@types/MTGSet";
import CardList, { splitListIntoBlocks, getColorType } from "../components/CardList";
import { testCardData } from "./testData";


describe("split into blocks function", () => {

  it("splits the list of cards into blocks of the given size", () => {
    const testCards = testCardData.slice(0,18).map(card => ({name: card.name, id: card.id, colorType: getColorType(card)}))
    expect(testCards.length).toEqual(18)

    const blocks = splitListIntoBlocks(testCards, 9)
    const firstBlock = blocks[0]
    const secondBlock = blocks[1]
    expect(firstBlock.cards.length).toEqual(9)
    expect(secondBlock.cards.length).toEqual(9)
  })
})