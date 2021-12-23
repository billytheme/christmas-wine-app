import { useState, useEffect } from "react";
import {
  Draggable,
  DropResult,
  resetServerContext,
  Droppable,
  DragDropContext,
} from "react-beautiful-dnd";
import Card from "../components/Card";
import { Wine } from "../staticProps/wines";

interface IndexProps {
  items: Array<Wine>;
  setItems: (items: Array<Wine>) => void;
}

export default function DraggableList({ items, setItems }: IndexProps) {
  const [wines, setWines] = [items, setItems];

  function handleOnDragEnd(result: DropResult) {
    const items = Array.from(wines);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (result.destination !== undefined) {
      items.splice(result.destination.index, 0, reorderedItem);
    }

    setWines(items);
  }

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return winReady ? (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="wines">
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            className="mx-auto flex flex-col items-stretch max-w-min"
            {...droppableProps}
            ref={innerRef}
          >
            {wines.map((wine, index) => (
              <Draggable
                key={wine.codeName}
                draggableId={wine.codeName}
                index={index}
              >
                {({ draggableProps, dragHandleProps, innerRef }) => (
                  <div
                    {...dragHandleProps}
                    {...draggableProps}
                    ref={innerRef}
                    className="p-1 min-w-max"
                  >
                    {/* {wine.codeName} */}
                    <Card className={"m-0 " + wine.colour}>
                      <p className="text-center">{wine.codeName}</p>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}
