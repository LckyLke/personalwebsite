import * as React from "react";

interface SquareProps {
  piece: string;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Square: React.FC<SquareProps> = ({ piece, onDrop, onDragOver }) => {
  return (
    <div
      className="square bg-gray-400 hover:bg-gray-300"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <p className="font-bold text-2xl">{piece}</p>
    </div>
  );
};

const ChessBoard: React.FC = () => {
  const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const [squares, setSquares] = React.useState(Array(64).fill(null));

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    if (event.currentTarget.firstChild)
      (event.currentTarget.firstChild as HTMLElement).innerHTML = data;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.innerHTML);
  };

  return (
    <div className="board grid grid-cols-8 gap-2">
      {rows.map((row) =>
        cols.map((col) => (
          <Square
            key={col}
            piece={squares[parseInt(row) + parseInt(col)]}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
          />
        ))
      )}
    </div>
  );
};

export default ChessBoard;
