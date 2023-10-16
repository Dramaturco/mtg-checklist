import React, { useEffect, useState, useContext } from "react";
import ConfigurationContext from "../Context/ConfigurationContext";
import { ConfigurationContextType } from "../@types/Configuration";
import { MTGCard } from "../@types/MTGSet";

type CardProps = {
  card: MTGCard;
  dark?: boolean;
};

//doing this the really dumb way because tailwind wants full class names somewhere in the code
function getCSSColorByType(colortype: string, dark: boolean | undefined) {
  let cssColor = "";
  let textColor = "";
  switch (colortype) {
    case "Red":
      cssColor = dark ? "bg-red-700" : "bg-red-200";
      textColor = dark ? "text-white" : "text-black";
      break;
    case "Blue":
      cssColor = dark ? "bg-blue-700" : "bg-blue-200";
      textColor = dark ? "text-white" : "text-black";
      break;
    case "Green":
      cssColor = dark ? "bg-green-700" : "bg-green-200";
      textColor = dark ? "text-white" : "text-black";
      break;
    case "Black":
      cssColor = dark ? "bg-mtgBlack-500" : "bg-mtgBlack-200";
      textColor = "text-white";
      break;
    case "White":
      cssColor = dark ? "bg-cream-500" : "bg-cream-200";
      textColor = "text-black";
      break;
    case "Artifact":
      cssColor = dark ? "bg-brown-700" : "bg-brown-300";
      textColor = "text-white";
      break;
    case "Land":
      cssColor = dark ? "bg-land-700" : "bg-land-300";
      textColor = "text-white";
      break;
    case "Multicolor":
      cssColor = dark ? "bg-gold-600" : "bg-gold-300";
      textColor = dark ? "text-white" : "text-black";
      break;
    default:
      cssColor = "bg-white";
      textColor = "text-black";
      break;
  }
  return { cssColor, textColor };
}

export default function Card({ card, dark }: CardProps) {
  const [background, setBackground] = useState("");
  const [textColor, setTextColor] = useState("text-black");
  const [cardName, setCardName] = useState("");
  const { configuration } = useContext(
    ConfigurationContext
  ) as ConfigurationContextType;

  useEffect(() => {
    if(configuration.showTypes) {
      setCardName(`${card.name} - ${card.type}`);
    }
    else {
      setCardName(card.name);
    }
  },[configuration.showTypes, card.name, card.type]);

  useEffect(() => {
    if (configuration.showColors) {
      const colors = getCSSColorByType(card.colorType, dark);
      setBackground(colors.cssColor);
      setTextColor(colors.textColor);
    }
    return () => {
      if (dark) {
        setBackground("bg-grey-100");
      } else {
        setBackground("bg-white");
      }
    };
  }, [configuration, card.colorType, dark, background]);
  return (
    <div
      className={`${background} px-2 py-2 border-black border-b w-full m-auto h-8`}
      data-testid="card"
    >
      {configuration.showLinks ? (
        <a
          href={card.link}
          target="_blank"
          rel="noreferrer"
          className="hover:font-bold cursor-pointer"
        >
          <p className={`${textColor} leading-4`}>{cardName}</p>
        </a>
      ) : (
        <p className={`${textColor} leading-4`}>{cardName}</p>
      )}
    </div>
  );
}
