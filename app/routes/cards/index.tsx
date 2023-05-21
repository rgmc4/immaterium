import { useEffect, useState } from "react";
import { useCardsRouteData, useDebounce } from "~/hooks";
import { StatLine } from "./components";
import type { Card } from "~/models/card.server";

export default function CardsIndexPage() {
  const { cards } = useCardsRouteData();

  const [activeCards, setActiveCards] = useState(cards);
  const [nameSearch, setNameSearch] = useState("");
  const debouncedNameSearch = useDebounce(nameSearch, 500);

  useEffect(() => {
    if (cards && debouncedNameSearch) {
      setActiveCards(
        cards.filter((card) =>
          card.name.toLowerCase().includes(debouncedNameSearch.toLowerCase())
        )
      );
    }
  }, [cards, debouncedNameSearch]);

  const headers = [
    "Key",
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
          <form>
            <label className="inline">
              <span className="inline text-sm font-medium text-slate-700">
                Name
              </span>
              <input
                type="text"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1"
              />
            </label>
          </form>
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
                {activeCards
                  ? activeCards.map((card) => (
                      <StatLine key={card.id} card={card} />
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
