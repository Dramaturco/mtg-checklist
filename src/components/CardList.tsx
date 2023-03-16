import { useEffect, useState } from "react";
import { MTGCard, MTGSet } from "../@types/MTGSet";
import Card from "./Card";

const scryfallApi = "https://api.scryfall.com";

type CardListProps = {
  set: MTGSet
};
export function splitListIntoBlocks(cards: MTGCard[], blocksize: number){
}
export function getColorType(rawCard: any): string {
  return ""
}
export default function CardList({ set }: CardListProps) {
  const [cards, setCards] = useState<MTGCard[]|null>(null)

  async function fetchCards(url: string): Promise<MTGCard[]> {
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

  async function fetchCardsForSelectedSet() {
    const url = scryfallApi + "/sets/" + set.code;
    const res = await fetch(url);
    const setData = await res.json();
    console.log(setData)
    const cards = await fetchCards(setData.search_uri);

    setCards(cards);
  }

  useEffect(() => {
    if(!cards){
      fetchCardsForSelectedSet()
    }
  },[])

  return (
    <div>
      {cards && cards.map((card: MTGCard) => (
        <Card name={card.name} key={card.id} />
      ))}
    </div>
  );
}
