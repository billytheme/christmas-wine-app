import { NextApiRequest, NextApiResponse } from "next";
import { clearContainer } from "../../database/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  clearContainer("votes", "wineVotes");
}
