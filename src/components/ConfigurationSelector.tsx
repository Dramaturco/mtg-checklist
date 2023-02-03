import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";
import React, { useContext } from "react";
import NumberInput from "./NumberInput";

export default function ConfigurationSelector() {
  const {configuration, setConfiguration} = useContext(ConfigurationContext) as ConfigurationContextType;

  function handleSlots(newValue: number) {
    setConfiguration({...configuration, slotsPerPage: newValue})
  }

  return (
    <div>
      <NumberInput min={4} max={9} handler={handleSlots} step={1} value={configuration.slotsPerPage} label="Slots per binder page"/>
    </div>
  );
}
