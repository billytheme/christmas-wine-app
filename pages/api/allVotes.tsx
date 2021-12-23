import { NextApiRequest, NextApiResponse } from "next";
import { queryMany } from "../../database/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const votes = await queryMany("votes", "wineVotes", {});
  res.status(200).json(votes);
}
