import { splitListIntoBlocks, getColorType } from "../components/CardList";
import { testCardData, getCardByName } from "./testData";


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

describe("get color type function", () => {
  it("returns the correct color type for a card with a single color", () => {
    const card = testCardData[0]
    const colorType = getColorType(card)
    expect(colorType).toEqual("White")
  })
  it("returns multicolor for a multicolor card", () => {
    const card = getCardByName("Bloodbond March")
    const colorType = getColorType(card)
    expect(colorType).toEqual("Multicolor")
  })
  it("returns multicolor for a hybrid card", () => {
    const card = getCardByName("Dimir Guildmage")
    const colorType = getColorType(card)
    expect(colorType).toEqual("Multicolor")
  })
  it("returns the color for a monocolored artifact card", () => {
    const card = getCardByName("Embercleave")
    const colorType = getColorType(card)
    expect(colorType).toEqual("Red")
  })
  it("returns multicolored for a multicolored artifact card", () => {
    const card = getCardByName("Baleful Strix")
    const colorType = getColorType(card)
    expect(colorType).toEqual("Multicolor")
  })
  it("returns artifact for an artifact card", () => {
    const card = getCardByName("Sol Ring")
    const colorType = getColorType(card)
    expect(colorType).toEqual("Artifact")
  })
  it("returns land for a land card", () => {
    const card = getCardByName("Volcanic Island")
    const colorType = getColorType(card)
    expect(colorType).toEqual("Land")
  })
})