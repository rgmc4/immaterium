import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getAllCards } from "~/models/card.server";
import type { Card } from "~/models/card.server";

export const loader: LoaderFunction = async () => {
  const cards = await getAllCards();
  return json({ cards });
};

type LoaderData = {
  cards: Card[];
};

export default function CardsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">Cards</Link>
      </h1>
    </header>
  );
}
