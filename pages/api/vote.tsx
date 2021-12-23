import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { updateOneVote } from "../../database/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session !== null) {
    const vote = JSON.parse(req.body);
    const voteWithUser = {
      user: session.user?.name,
      vote: vote,
    };
    updateOneVote("votes", "wineVotes", voteWithUser);
  }
  res.status(200).json({});
}
