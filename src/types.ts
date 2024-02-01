import { Bishop, Figure, King, Knight, Pown, Queen, Rook } from "./figureMoves";

export type ColorType = "white" | "black";

export type AllFiguresType = Pown | King | Queen | Bishop | Knight | Rook;

export interface IBoard {
  row: number;
  col: number;
  color: ColorType;
  figure?: AllFiguresType;
}

export type FiguresUtl = "pown" | "king" | "rook" | "bishop" | "knight" | "queen";
