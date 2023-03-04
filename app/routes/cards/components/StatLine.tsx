import { Link } from "@remix-run/react";
import type { Card } from "~/models/card.server";

type loaderData = {
  card: Card;
};

export function StatLine({ card }: loaderData) {
  return (
    <tr key={card.key}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        <Link to={card.key.toString()}>{card.name}</Link>
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.type ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.faction ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.loyalty ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.keywords ? card.keywords.join(", ") : null}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.traits ? card.traits.join(", ") : null}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.full_ability_text ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.cost ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.attack ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.hit_points ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.command ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.shields ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.cycle ?? "-"}
      </td>
      <td className="px-6 py-4 text-sm font-light text-gray-900">
        {card.set ?? "-"}
      </td>
    </tr>
  );
}
