import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";
import React, { useContext } from "react";
import NumberInput from "./NumberInput";
import ConfigurationToggle from "./ConfigurationToggle"

export default function ConfigurationSelector() {
  const {configuration, setConfiguration} = useContext(ConfigurationContext) as ConfigurationContextType;

  function handleSlots(newValue: number) {
    setConfiguration({...configuration, slotsPerPage: newValue})
  }

  function handleColors(newValue: boolean) {
    setConfiguration({...configuration, showColors: newValue})
  }

  function handleLinks(newValue: boolean) {
    setConfiguration({...configuration, showLinks: newValue})
  }

  return (
    <div className="flex flex-row print:hidden">
      <NumberInput min={4} max={9} handler={handleSlots} step={1} value={configuration.slotsPerPage} label="Slots per binder page"/>
      <ConfigurationToggle label="Show colors" handle={handleColors} checked={!!configuration.showColors}/>
      <ConfigurationToggle label="Show Links" handle={handleLinks} checked={!!configuration.showLinks}/>
    </div>
  );
}
