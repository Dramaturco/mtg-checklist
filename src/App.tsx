import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";

const scryfallApi = "https://api.scryfall.com";
type MTGSet = { name: string; code: string };
type MTGCard = { name: string, id: string };

function App() {
  const [sets, setSets] = useState([{ name: "Revised Edition", code: "3ed" }]);
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [cardData, setCardData] = useState([] as MTGCard[]);

  useEffect(() => {
    async function fetchData() {
      const url = scryfallApi + "/sets/" + sets[selectedSetIndex].code;
      const res = await fetch(url);
      const setData = await res.json()
      const cards = await fetchCards(setData.search_uri)

      setCardData(cards)
    }
    async function fetchCards(url: string): Promise<MTGCard[]>{
      const cardsUrl = new URL(url)
      cardsUrl.searchParams.set("include_variations", "false");
      let res = await fetch(cardsUrl)
      let cardsData = await res.json()
      let cards = cardsData.data

      while(cardsData.has_more){
        const res = await fetch(cardsData.next_page)
        cardsData = await res.json()
        const moreCards = cardsData.data

        cards.push(...moreCards)

      }
      console.log(cards)
      return cards
    }
    fetchData()
  }, []);

  return (
    <div className="App">
      <select>
        {sets.map((set) => (
          <option key={set.code}>{set.name}</option>
        ))}
      </select>
      {cardData.map(card => <Card name={card.name} key={card.id}/>)}
    </div>
  );
}

export default App;
