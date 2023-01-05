import { useState } from "react";
import { MTGSet } from "../App";

export default function SetSelector(props: any) {
  const [filter, setFilter] = useState("");
  const [displayedSets, setDisplayedSets] = useState(props.setList);

  const filterChangeFunction = (value: string) => {
    setFilter(value);
    setDisplayedSets(
      props.setList.filter((set: MTGSet) => set.name.includes(filter))
    );
  };
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
        onKeyDown={(e) => e.key === "Enter" && props.selectSet(filter)}
      />
      <datalist
        className="bg-green-300"
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
