import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";
import React, { useContext } from "react";
import NumberInput from "./NumberInput";

export default function ConfigurationSelector() {
  const {configuration, setConfiguration} = useContext(ConfigurationContext) as ConfigurationContextType;

  function handleSlots(newValue: number) {
    setConfiguration({...configuration, slotsPerPage: newValue})
  }

  function handleColors(newValue: boolean) {
    setConfiguration({...configuration, showColors: newValue})
  }

  return (
    <div className="flex flex-row print:hidden">
      <NumberInput min={4} max={9} handler={handleSlots} step={1} value={configuration.slotsPerPage} label="Slots per binder page"/>
      <div className="flex items-center pl-4">
        <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={configuration.showColors} onChange={(e) => handleColors(e.target.checked)} />
        <label className="w-full py-4 ml-2 text-sm font-medium text-teal-500 pb-4" htmlFor="showColors">Show colors</label>
      </div>
    </div>
  );
}
