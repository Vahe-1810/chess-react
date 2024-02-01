// import { useDrag } from "react-dnd";
import { Dispatch, SetStateAction } from "react";
import { Board } from "./startPositions";
import { AllFiguresType, ColorType } from "./types";

interface Props {
  color: ColorType;
  coords: { col: number; row: number };
  figure?: AllFiguresType;
  board: Board;
  showPossibleMoves: (posMovesArr: { r: number; c: number }[]) => void;
  isPossible: boolean;
  selectedFigure: AllFiguresType | null;
  setSelectedFigure: (f: AllFiguresType | null) => void;
  setBoard: Dispatch<SetStateAction<Board>>;
  move: ColorType;
  setMove: Dispatch<SetStateAction<ColorType>>;
}

const Cell = (props: Props) => {
  const { figure, coords, board, isPossible, selectedFigure, color, move } = props;
  const { setBoard, showPossibleMoves, setSelectedFigure, setMove } = props;
  const { col, row } = coords;

  const figureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (figure?.color !== move) return;

    board.cells.forEach((cell) => {
      if (col === cell.col && row === cell.row) {
        showPossibleMoves(cell.figure!.showMoves(board));
        setSelectedFigure(figure!);
      }
    });
  };

  const cellClick = () => {
    if (!selectedFigure) return;

    if (isPossible) {
      setBoard((pb): Board => {
        const RdC = [selectedFigure?.c, selectedFigure?.r];
        selectedFigure!.doMove(col, row);

        const newCells = pb.cells.map((cell) => {
          if (selectedFigure?.c === cell.col && selectedFigure.r === cell.row) {
            return { ...cell, figure: selectedFigure };
          }
          if (RdC[0] === cell.col && RdC[1] === cell.row) return { ...cell, figure: undefined };
          return cell;
        });
        setMove((prevMove) => (prevMove === "black" ? "white" : "black"));
        return new Board(newCells);
      });
    }

    showPossibleMoves([]);
    setSelectedFigure(null);
  };

  return (
    <div className={`cell ${color}`} onClick={cellClick}>
      {figure && (
        <img
          src={figure.url}
          style={{
            fontWeight: "bold",
            cursor: move === figure.color ? "grab" : "",
          }}
          onClick={figureClick}
        />
      )}
      {isPossible && <div className="possible-moves"></div>}
    </div>
  );
};

export default Cell;

// const [{ isDragging }, drag] = useDrag(() => ({
//   type: figure?.type || "empty",
//   canDrag: !!figure,
//   collect: (monitor) => ({
//     isDragging: !!monitor.isDragging(),
//   }),
// }));
