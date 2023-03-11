import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { getCardFetchData } from "~/models/card.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const query = new URLSearchParams(url.search).get("query");
  const cardData = await getCardFetchData(query);

  return json(cardData);
}
