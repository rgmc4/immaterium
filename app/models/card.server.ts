import { supabase } from "./user.server";

export type Card = {
  id: string;
  key: string;
  cycle: string;
  set: string;
  cycle_number: string;
  name: string;
  type: CardType;
  is_unique: boolean;
  faction: string;
  attack: string;
  hit_points: string;
  cost: string;
  command: string;
  shields: string;
  deck_limit: string;
  loyalty: string;
  traits: string[];
  keywords: string[];
  full_ability_text: string;
  card_bonus: string;
  resource_bonus: string;
  starting_cards: string;
  starting_resources: string;
  sector: string;
  planet_material: string;
  planet_stronghold: string;
  planet_tech: string;
  designer: string;
  flavour_text: string;
  errata_text: string;
};

export type HotLink = {
  url: string;
};

export type CardFetchData =
  | Pick<Card, "key" | "name" | "full_ability_text"> & HotLink;

export type CardType =
  | "Warlord"
  | "Synapse"
  | "Army"
  | "Attachment"
  | "Event"
  | "Support"
  | "Planet";

export async function getAllCards() {
  const { data } = await supabase
    .from("cards")
    .select("*, sets (name), cycles (name), sectors (name)")
    .not("cycle_id", "in", "(7, 8, 14)")
    .order("sort_id");
  return data;
}

const defaultCard: CardFetchData = {
  name: "",
  key: "",
  full_ability_text: "",
  url: `http://localhost:3000/assets/cards/default.webp`,
};

export async function getCardFetchData(
  searchTerm: string | null | undefined
): Promise<CardFetchData> {
  let cardData: CardFetchData = defaultCard;

  if (searchTerm && searchTerm.length >= 3) {
    const { data } = await supabase
      .rpc("search_cards", {
        card_term: searchTerm,
      })
      .returns<CardFetchData>()
      .single();
    if (data) {
      cardData = data;
      cardData.url = `http://localhost:3000/assets/cards/${data.key}.webp`;
    }
  }
  return cardData;
}
