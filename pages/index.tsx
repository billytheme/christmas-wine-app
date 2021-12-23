import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const { data } = useSession();

  useEffect(() => {
    data?.user ? router.push("/vote") : null;
  }, [data]);

  function submit() {
    signIn("credentials", {}, { name: name });
  }

  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        <p>Name: </p>
        <input
          className="border border-black rounded p-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mx-auto my-4 max-w-max">
        <Button onClick={submit}>Submit</Button>
      </div>
    </>
  );
}
