export interface Wine {
  codeName: string;
  name: string;
  colour: string;
  value: number;
}

const wines: Array<Wine> = [
  {
    codeName: "Wine 1",
    name: "Four Corners",
    colour: "bg-green-500",
    value: 10,
  },
  {
    codeName: "Wine 2",
    name: "Bottom Shelf",
    colour: "bg-red-500",
    value: 100,
  },
  {
    codeName: "Wine 3",
    name: "Literally $1000",
    colour: "bg-yellow-500",
    value: 1000,
  },
].sort((a, b) => a.value - b.value);

export default wines;
