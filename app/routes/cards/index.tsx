import { Link } from "@remix-run/react";
import { useCardsRouteData } from "~/hooks";
import { StatLine } from "./components";

export default function CardsIndexPage() {
  const { cards } = useCardsRouteData();

  const headers = [
    "Name",
    "Type",
    "Faction",
    "Loyalty",
    "Keywords",
    "Traits",
    "Ability",
    "Cost",
    "Attack",
    "Hit Points",
    "Command",
    "Shields",
    "Cycle",
    "Set",
  ];

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b bg-gray-200">
                <tr>
                  {headers.map((header) => {
                    return (
                      <th
                        key={`header-${header}`}
                        scope="col"
                        className="sticky px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y">
                {cards.map((card) => (
                  <StatLine key={card.id} card={card} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
