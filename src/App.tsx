import React, { useState, useEffect, useCallback } from "react";
import SetSelector from "./components/SetSelector";
import ConfigurationContext from "./Context/ConfigurationContext";
import ConfigurationSelector from "./components/ConfigurationSelector";
import { MTGSet, MTGCard } from "./@types/MTGSet";
import CardList from "./components/CardList";



function App() {
  const [selectedSet, setSelectedSet] = useState({name: "", code: ""});
  const [configuration, setConfiguration] = useState({slotsPerPage: 9, cardCondition: false})


  function handleSetSelect(set: MTGSet): void {
    console.log("Selected set")
    console.log(set)
    setSelectedSet(set);
  }

  return (
    <div className="App">
      <ConfigurationContext.Provider value={{configuration, setConfiguration}}>
          <SetSelector
            selectSet={handleSetSelect}
          />
        <div className="container mx-auto flex justify-center">
        <ConfigurationSelector />
        </div>
        {
          selectedSet.name !== "" && 
          <CardList set={selectedSet}/>
        }
      </ConfigurationContext.Provider>
    </div>
  );
}

export default App;
