import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import Button from "../components/Button";
import DraggableList from "../components/DraggableList";
import wines, { Wine } from "../staticProps/wines";

interface IndexProps {
  data: Array<Wine>;
}

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  return {
    props: {
      data: wines,
    },
  };
};

export default function Vote({ data }: IndexProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [wineOrder, setWineOrder] = useState(
    wines.sort(() => (Math.random() > 0.5 ? 1 : -1))
  );

  useEffect(() => {
    session?.user ? null : router.push("/");
  }, [data]);

  async function submit() {
    const submission = JSON.stringify(wineOrder);
    await fetch("/api/vote", { method: "POST", body: submission });
    router.push("/results");
  }

  return (
    <>
      <p className="text-lg text-center font-bold mb-4">
        Hello, {session?.user?.name}
      </p>
      <p className="text-lg text-center font-bold">Best</p>
      <DraggableList items={wineOrder} setItems={setWineOrder} />
      <p className="text-lg text-center font-bold">Worst</p>
      <div className="mx-auto my-4 max-w-max">
        <Button onClick={submit}>Submit</Button>
      </div>
    </>
  );
}
