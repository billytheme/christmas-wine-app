import React from "react";
import Button from "../components/Button";

export default function Admin() {
  async function reset() {
    await fetch("/api/reset");
  }
  return (
    <div className="flex justify-center">
      <Button onClick={reset}>Reset Votes</Button>
    </div>
  );
}
