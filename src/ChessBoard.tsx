import Cell from "./Cell";
import { useState } from "react";
import { Board } from "./startPositions";
import { AllFiguresType, ColorType } from "./types";

const Chessboard = () => {
  const [board, setBoard] = useState(new Board());
  const [possibleMoves, setPossibleMoves] = useState<{ r: number; c: number }[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<null | AllFiguresType>(null);
  const [move, setMove] = useState<ColorType>("white");

  const showPossibleMoves = (posMovesArr: { r: number; c: number }[]) => {
    setPossibleMoves(posMovesArr);
  };

  return (
    <div className="chess-board">
      {board.cells.map(({ col, color, row, figure }) => {
        const isPossible = possibleMoves.some(({ r, c }) => col === c && r === row && selectedFigure!.showMoves(board));

        return (
          <Cell
            board={board}
            color={color}
            key={`${col}-${row}`}
            figure={figure}
            coords={{ col, row }}
            showPossibleMoves={showPossibleMoves}
            isPossible={isPossible}
            setBoard={setBoard}
            selectedFigure={selectedFigure}
            setSelectedFigure={setSelectedFigure}
            move={move}
            setMove={setMove}
          />
        );
      })}
    </div>
  );
};

export default Chessboard;
