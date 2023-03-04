import { useMatches } from "@remix-run/react";
import type { Card } from "~/models/card.server";

export function useCardsRouteData(cardId = "") {
  const cardsData = useMatches().find((match) => match.pathname === "/cards")
    ?.data as {
    cards: Array<Card>;
  };

  const card = cardId
    ? cardsData.cards.find((card) => card.id === cardId)
    : null;

  return {
    cards: cardsData.cards,
    card,
  };
}
