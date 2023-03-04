import { useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { useCardsRouteData } from "~/hooks";

export default function CardDetailsPage() {
  const params = useParams();
  invariant(params.cardId, "Card id not present");
  const { card } = useCardsRouteData(params.cardId);

  return (
    <div>
      <h3 className="text-2xl font-bold">
        {card ? card.name : "Card not found"}
      </h3>
    </div>
  );
}
