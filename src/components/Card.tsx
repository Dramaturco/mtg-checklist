import React, { useEffect, useState, useContext } from "react";
import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";

type CardProps = {
  name: string;
  colorType: string;
  dark?: boolean;
};

//doing this the really dumb way because tailwind wants full class names somewhere in the code
function getCSSColorByType(colortype: string, dark: boolean | undefined) {
  let cssColor = "";
    switch (colortype) {
      case "Red":
        cssColor += dark ? "bg-red-500" : "bg-red-200";
        break;
      case "Blue":
        cssColor += dark ? "bg-blue-500" : "bg-blue-200";
        break;
      case "Green":
        cssColor += dark ? "bg-green-500" : "bg-green-200";
        break;
      case "Black":
        cssColor += dark ? "bg-black-500" : "bg-black-200";
        break;
      case "White":
        cssColor += dark ? "bg-cream-500" : "bg-cream-200";
        break;
      case "Artifact":
        cssColor += dark ? "bg-brown-500" : "bg-brown-200";
        break;
      case "Land":
        cssColor += dark ? "bg-land-500" : "bg-land-200";
        break;
      case "Multicolor":
        cssColor += dark ? "bg-gold-500" : "bg-gold-200";
        break;
      default:
        cssColor += "bg-white";
        break;
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
