import { useEffect, useState } from "react";
import { MTGSet } from "../@types/MTGSet";

const scryfallApi = "https://api.scryfall.com";

export default function SetSelector(props: any) {
  const [filter, setFilter] = useState<string>("");
  const [allSets, setAllSets] = useState<MTGSet[]|null>(null);
  const [displayedSets, setDisplayedSets] = useState<MTGSet[]>([]);

  async function fetchSets() {
    const url = scryfallApi + "/sets";
    const res = await fetch(url);
    const json = await res.json();
    const sets = json.data.map((set: any) => ({
      name: set.name,
      code: set.code,
    }));

    setAllSets(sets);
  }

  useEffect(() => {
    if(!allSets){
      fetchSets()
    }
  }, [])
  const filterChangeFunction = (value: string) => {
    setFilter(value);
    if(allSets){
      setDisplayedSets(
        allSets.filter((set: MTGSet) => set.name.toLowerCase().includes(filter.toLowerCase()))
      );
    }
  };
  const selectSet = (setName: string) => {
    const selectedSet = displayedSets.find(set => set.name === setName)
    props.selectSet(selectedSet)
  }
  return (
    <div>
      <input
        type="text"
        value={filter}
        list="sets"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          filterChangeFunction(e.target.value);
        }}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          filterChangeFunction(e.target.value)
        }
        className="border-black border p-2 rounded-sm"
        onKeyDown={(e) => e.key === "Enter" && selectSet(filter)}
      />
      <datalist
        id="sets"
      >
        {displayedSets.map((set: MTGSet) => (
          <option key={set.code} value={set.name}>
            {set.name}
          </option>
        ))}
      </datalist>
    </div>
  );
}
