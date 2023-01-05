import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Card from "./components/Card";
import SetSelector from "./components/SetSelector";

const scryfallApi = "https://api.scryfall.com";
export type MTGSet = { name: string; code: string };
type MTGCard = { name: string; id: string };

function App() {
  const [sets, setSets] = useState([] as MTGSet[]);
  const [selectedSet, setSelectedSet] = useState({} as MTGSet);
  const [cardData, setCardData] = useState([] as MTGCard[]);

  const fetchSets = useCallback(async function fetchSets() {
    const url = scryfallApi + "/sets";
    const res = await fetch(url);
    const json = await res.json();
    const sets = json.data.map((set: any) => ({
      name: set.name,
      code: set.code,
    }));

    return sets;
  },[]);
  async function fetchCardsForSelectedSet() {
    const url = scryfallApi + "/sets/" + selectedSet.code;
    const res = await fetch(url);
    const setData = await res.json();
    const cards = await fetchCards(setData.search_uri);

    setCardData(cards);
  }
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

  useEffect(() => {
    let setsLoaded = true;

    const refetchSets = async () => {
      const fetchedSets = await fetchSets();
      if(setsLoaded) {
        setSets(fetchedSets)
      }
    }
    refetchSets();

    return () => {

    }
  }, [fetchSets]);

  useEffect(() => {
    fetchCardsForSelectedSet();
  },[selectedSet])

  function handleSetSelect(setName: string): void {
    const set = sets.find((set: MTGSet) => set.name === setName )!
    setSelectedSet(set);
  }

  return (
    <div className="App">
      <SetSelector
        setList={sets}
        selectSet={handleSetSelect}
      />
      {cardData.map((card) => (
        <Card name={card.name} key={card.id} />
      ))}
    </div>
  );
}

export default App;
