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

export type CardType =
  | "Warlord"
  | "Synapse"
  | "Army"
  | "Attachment"
  | "Event"
  | "Support"
  | "Planet";

export async function getCards() {
  const { data } = await supabase
    .from("cards")
    .select("*, sets (name), cycles (name), sectors (name)");
  return data;
}
