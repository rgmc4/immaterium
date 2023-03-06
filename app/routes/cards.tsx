import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCards } from "~/models/card.server";
import type { Card } from "~/models/card.server";

export const loader: LoaderFunction = async () => {
  const cards = await getCards();
  return json({ cards });
};

type LoaderData = {
  cards: Card[];
};

export default function CardsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Outlet />
    </div>
  );
}
