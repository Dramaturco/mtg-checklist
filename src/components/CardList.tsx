import { useEffect, useState, useContext } from "react";
import {
  MTGCard,
  MTGColorType,
  MTGSet,
  MTGCardBlock,
  supertypes,
  MTGRawCard,
} from "../@types/MTGSet";
import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";
import BinderPage from "./BinderPage";
import { v4 as uuidv4 } from "uuid";

const scryfallApi = "https://api.scryfall.com";

type CardListProps = {
  set: MTGSet;
};
export function extractSuperType(typeLine: string): string {
  console.log(typeLine);
  const types = typeLine.split(" ");
  const superType = types.find((type) =>
    supertypes.includes(type.toLowerCase())
  );
  return superType ? superType : "";
}
export function splitListIntoBlocks(
  cards: MTGCard[],
  blocksize: number
): MTGCardBlock[] {
  return cards.reduce((splitList, card, index) => {
    const chunkIndex = Math.floor(index / blocksize);

    if (!splitList[chunkIndex]) {
      splitList[chunkIndex] = { colorTypes: [], cards: [] };
    }

    splitList[chunkIndex].cards.push(card);

    return splitList;
  }, [] as MTGCardBlock[]);
}
export function getColorType(rawCard: any): MTGColorType {
  function checkTypeLine(typeLine: string): string | undefined {
    const types = ["Artifact", "Land"];
    return types.find((type) => typeLine.includes(type));
  }

  if (rawCard.colors.length > 1) {
    return "Multicolor";
  }
  switch (rawCard.colors[0]) {
    case "R":
      return "Red";
    case "W":
      return "White";
    case "U":
      return "Blue";
    case "B":
      return "Black";
    case "G":
      return "Green";
  }
  const typeLine = checkTypeLine(rawCard.type_line);
  if (typeLine) {
    return typeLine as MTGColorType;
  }
  return "Red";
}
export default function CardList({ set }: CardListProps) {
  const [cards, setCards] = useState<MTGCard[] | null>(null);
  const [blocks, setBlocks] = useState<MTGCardBlock[] | null>(null);
  const { configuration } = useContext(
    ConfigurationContext
  ) as ConfigurationContextType;

  async function fetchCards(url: string): Promise<MTGRawCard[]> {
    const cardsUrl = new URL(url);
    cardsUrl.searchParams.set("include_variations", "false");
    let res = await fetch(cardsUrl);
    let cardsData = await res.json();
    let cards = cardsData.data;

    while (cardsData.has_more) {
      const res = await fetch(cardsData.next_page);
      cardsData = await res.json();
      const moreCards = cardsData.data;

      cards.push(...moreCards);
    }

    return cards;
  }

  useEffect(() => {
    async function fetchCardsForSelectedSet() {
      const url = scryfallApi + "/sets/" + set.code;
      const res = await fetch(url);
      const setData = await res.json();
      const cards = await fetchCards(setData.search_uri);
      const cardsWithColorType = cards.map((card) => ({
        ...card,
        colorType: getColorType(card),
        link: card.scryfall_uri,
        type: extractSuperType(card.type_line),
      }));

      setCards(cardsWithColorType);
    }
    fetchCardsForSelectedSet();
  }, [set]);

  useEffect(() => {
    if (cards) {
      const blocks = splitListIntoBlocks(cards, configuration.slotsPerPage);
      setBlocks(blocks);
    }
  }, [cards, configuration.slotsPerPage]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 w-4/5 m-auto gap-1 sm:grid-cols-1 print:grid-cols-3 print:w-a4 print:h-a4 print:gap-4 print:m-4">
      {blocks &&
        blocks.map((block) => <BinderPage key={uuidv4()} block={block} />)}
    </div>
  );
}
