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
    colour: "bg-white",
    value: 10,
  },
  {
    codeName: "Wine 2",
    name: "Bottom Shelf",
    colour: "bg-white",
    value: 100,
  },
  {
    codeName: "Wine 3",
    name: "Literally $1000",
    colour: "bg-white",
    value: 1000,
  },
].sort((a, b) => b.value - a.value);

export default wines;
