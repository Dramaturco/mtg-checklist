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
  "vanguard"
]
export type MTGColorType = "Red" | "Green" | "Blue" | "White" | "Black" | "Land" | "Multicolor" | "Artifact"
export type MTGSet = { name: string; code: string; };
export type MTGCard = { name: string; id: string; colorType: MTGColorType};
export type MTGCardBlock = { colorTypes: MTGColorType[]; cards: MTGCard[]; }
export type MTGCardList = { blocksize: number; blocks: MTGCardBlock[]; }
