import React, { useEffect } from "react";
import Card from "../components/Card";
import { GetServerSideProps } from "next";
import wines, { Wine } from "../staticProps/wines";
import { queryOne } from "../database/mongo";
import { getSession } from "next-auth/react";
import useSWR from "swr";

interface ResultsProps {
  wines: Array<Wine>;
  myVote: Array<Wine>;
}

interface Vote {
  user: string;
  vote: Array<Wine> | null;
}

export const getServerSideProps: GetServerSideProps<ResultsProps> = async (
  context
) => {
  const session = await getSession({ ctx: context });
  const myVote = await queryOne("votes", "wineVotes", {
    user: session?.user?.name,
  });

  return {
    props: {
      myVote: myVote?.vote || null,
      wines: wines,
    },
  };
};

export default function Results({ wines, myVote }: ResultsProps) {
  const { data: votes, mutate } = useSWR("/api/allVotes", async (args) => {
    return await (await fetch(args)).json();
  });

  useEffect(() => {
    setInterval(mutate, 5000);
  }, []);

  const totalVotes = votes?.length;

  const voteTotals = wines.map((_, index) => {
    return wines?.map((wine) => {
      return votes?.filter(
        (vote: Vote) =>
          JSON.stringify(vote.vote !== null ? vote.vote[index] : null) ==
          JSON.stringify(wine)
      ).length;
    });
  });

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col items-stretch max-w-min w-1/2">
          <p className="font-bold text-center">Your Order</p>
          {myVote?.map((wine) => (
            <div className="p-1 min-w-max flex-1" key={wine.codeName}>
              <Card className={"m-0 "}>
                <p className="text-center">{wine.codeName}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <p className="font-bold text-center mt-8">What other people thought</p>
      <div className="flex flex-col items-stretch max-w-min mx-auto gap-3 m-3">
        {wines.map((wine, posIndex) => (
          <div
            className="flex items-stretch mx-auto w-80 gap-1"
            key={wine.codeName}
          >
            <div className="w-1/2 h-full">
              <Card className={"m-0 "}>
                <p className="text-center">
                  {"Position " + (posIndex + 1).toString()}
                </p>
              </Card>
            </div>
            <div className="w-1/2">
              {wines.map((wine, wineIndex) => (
                <div className="relative w-full h-1/3" key={wine.codeName}>
                  <p className="absolute top-0 left-0 right-0 bottom-0 z-10">
                    {wine.codeName +
                      ": " +
                      (voteTotals[posIndex][wineIndex] || 0) +
                      " vote" +
                      (voteTotals[posIndex][wineIndex] !== 1 ? "s" : "")}
                  </p>
                  <div
                    className="bg-gray-300 absolute top-0 left-0 bottom-0 w-full z-0"
                    style={{
                      width:
                        (
                          ((voteTotals[posIndex][wineIndex] || 0) /
                            (totalVotes || 1)) *
                          100
                        ).toString() + "%",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
