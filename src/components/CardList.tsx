import { MTGCard, MTGCardList } from "../@types/MTGSet";
import Card from "./Card";

type CardListProps = {
  cards: MTGCard[];
};
export function splitListIntoBlocks(cards: MTGCard[], blocksize: number){
}
export function getColorType(rawCard: any): string {
  return ""
}
export default function CardList({ cards }: CardListProps) {
  return (
    <div>
      {cards.map((card) => (
        <Card name={card.name} key={card.id} />
      ))}
    </div>
  );
}
