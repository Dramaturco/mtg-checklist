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
export type MTGSet = { name: string; code: string; };
export type MTGCard = { name: string; id: string; };
export type MTGCardBlock = { color_types: string[]; cards: MTGCard[]; }
export type MTGCardList = { blocksize: number; blocks: MTGCardBlock[]; }
