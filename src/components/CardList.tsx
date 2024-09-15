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
import PrintPage from "./PrintView/PrintPage";

const scryfallApi = "https://api.scryfall.com";

type CardListProps = {
  set: MTGSet;
};

type BlockChunk = {
  blocks: MTGCardBlock[];
};

export const CARD_HEIGHT_PX = 32;
export const A4_HEIGHT_CM = 29.7;
export const A4_WIDTH_CM = 21;
export const HEIGHT_MARGINS = 4;
export const WIDTH_MARGINS = 1;
export const NUM_COLUMNS = 3;

export function extractSuperType(typeLine: string): string {
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
export function splitBlocksIntoBlockChunks(
  blocks: MTGCardBlock[],
  blocksPerPrintPage: number
) {
  return blocks.reduce((splitList, block, index) => {
    const chunkIndex = Math.floor(index / blocksPerPrintPage);

    if (!splitList[chunkIndex]) {
      splitList[chunkIndex] = { blocks: [] };
    }

    splitList[chunkIndex].blocks.push(block);

    return splitList;
  }, [] as BlockChunk[]);
}
function px2cm(px: number): number {
  const cpi = 2.54; // centimeters per inch
  const dpi = 96; // dots per inch
  const ppd = window.devicePixelRatio; // pixels per dot
  return (px * cpi) / (dpi * ppd);
}
export function calculateBlocksPerPrintPage(cardsPerBlock: number) {
  const cardHeightInCm = px2cm(32);
  const blockheight = cardsPerBlock * cardHeightInCm;
  console.log(cardHeightInCm);
  console.log(blockheight);
  return (
    Math.floor((A4_HEIGHT_CM - HEIGHT_MARGINS) / blockheight) * NUM_COLUMNS
  );
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
  const [printBlockChunks, setPrintBlockChunks] = useState<BlockChunk[] | null>(
    null
  );
  const [blocksPerPrintPage, setBlocksPerPrintPage] = useState<number>(0);
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
      if (configuration.printView) {
        setBlocksPerPrintPage(
          calculateBlocksPerPrintPage(configuration.slotsPerPage)
        );
        const blockChunks = splitBlocksIntoBlockChunks(
          blocks,
          blocksPerPrintPage
        );
        setPrintBlockChunks(blockChunks);
      }
      setBlocks(blocks);
    }
  }, [cards, configuration.slotsPerPage, configuration.printView]);

  const renderPrintPages = () =>
    printBlockChunks &&
    printBlockChunks.map((blockChunk: BlockChunk, index) => (
      <PrintPage
        blocks={blockChunk.blocks}
        headerProps={{
          pageNumber: index + 1,
          totalPages: printBlockChunks.length,
        }}
        key={uuidv4()}
      />
    ));
  const renderBinderPages = () =>
    blocks &&
    blocks.map((block) => <BinderPage key={uuidv4()} block={block} />);

  const regularView =
    "grid lg:grid-cols-3 md:grid-cols-2 w-4/5 m-auto gap-1 sm:grid-cols-1 print:grid-cols-3 print:w-a4 print:h-a4 print:gap-4 print:m-4";

  const printView = "w-[21cm] m-auto";
  return (
    <div className={configuration.printView ? printView : regularView}>
      {configuration.printView ? renderPrintPages() : renderBinderPages()}
    </div>
  );
}
