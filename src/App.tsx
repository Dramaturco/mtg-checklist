import React, { useState } from "react";
import SetSelector from "./components/SetSelector";
import ConfigurationContext from "./Context/ConfigurationContext";
import ConfigurationSelector from "./components/ConfigurationSelector";
import { MTGSet } from "./@types/MTGSet";
import CardList from "./components/CardList";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [selectedSet, setSelectedSet] = useState({ name: "", code: "" });
  const [configuration, setConfiguration] = useState({
    slotsPerPage: 9,
    cardCondition: false,
    printView: false,
  });

  function handleSetSelect(set: MTGSet): void {
    setSelectedSet(set);
  }

  return (
    <div className="App">
      <ConfigurationContext.Provider
        value={{ configuration, setConfiguration }}
      >
        <ErrorBoundary>
          <SetSelector selectSet={handleSetSelect} />
          <div className="container mx-auto flex justify-center">
            {selectedSet && selectedSet.name !== "" && (
              <ConfigurationSelector />
            )}
          </div>
          {selectedSet && selectedSet.name !== "" && (
            <CardList set={selectedSet} />
          )}
        </ErrorBoundary>
      </ConfigurationContext.Provider>
    </div>
  );
}

export default App;
