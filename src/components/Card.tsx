import React, { useEffect, useState, useContext } from "react";
import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";

type CardProps = {
  name: string;
  colorType: string;
  dark?: boolean;
};

function getCSSColorByType(colortype: string, dark: boolean | undefined) {
  let cssColor = "";
  switch (colortype) {
    case "Red":
      cssColor += "bg-red-";
      break;
    case "Blue":
      cssColor += "bg-blue-";
      break;
    case "Green":
      cssColor += "bg-green-";
      break;
    case "Black":
      cssColor += "bg-black-";
      break;
    case "White":
      cssColor += "bg-cream-";
      break;
    case "Artifact":
      cssColor += "bg-brown-";
      break;
    case "Land":
      cssColor += "bg-land-";
      break;
    case "Multicolor":
      cssColor += "bg-gold-";
      break;
    default:
      cssColor += "bg-white";
      break;
    }
    if(cssColor !== "bg-white"){
      cssColor += dark ? "500" : "200";
    }
    return cssColor;
}
export default function Card({ name, colorType, dark }: CardProps) {
  const [background, setBackground] = useState("bg-white");
  const { configuration } = useContext(
    ConfigurationContext
  ) as ConfigurationContextType;

  useEffect(() => {
    if (configuration.showColors) {
      const cssColor = getCSSColorByType(colorType, dark);
      setBackground(cssColor);
    }
    return () => {
      setBackground("bg-white");
    };
  }, [configuration, colorType, dark, background]);
  return (
    <div
      className={`${background} px-2 py-2 border-black border-b-0 border w-1/3 m-auto h-1/3`}
      data-testid="card"
    >
      <p>{name}</p>
    </div>
  );
}
