export const supertypes = [
  "artifact",
  "conspiracy",
  "creature",
  "dungeon",
  "enchantment",
  "instant",
  "land",
  "phenomenon",
  "plane",
  "planeswalker",
  "scheme",
  "sorcery",
  "tribal",
  "vanguard",
];
export type MTGColorType =
  | "Red"
  | "Green"
  | "Blue"
  | "White"
  | "Black"
  | "Land"
  | "Multicolor"
  | "Artifact";
export type MTGSet = { name: string; code: string };
export type MTGRawCard = {
  name: string;
  id: string;
  colorIdentity: string[];
  type_line: string;
  scryfall_uri: string;
};
export type MTGCard = {
  name: string;
  id: string;
  colorType: MTGColorType;
  type: string;
  link: string;
};
export type MTGCardBlock = { colorTypes: MTGColorType[]; cards: MTGCard[] };
export type MTGCardList = { blocksize: number; blocks: MTGCardBlock[] };
