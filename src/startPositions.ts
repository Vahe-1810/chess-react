import { IBoard } from "./types";
import { Bishop, King, Knight, Pown, Queen, Rook } from "./figureMoves";

export class Board {
  cells: IBoard[];

  constructor(board?: IBoard[]) {
    this.cells = [];
    if (board) {
      this.setNewPosition(board);
    } else this.setStartedPosition();
  }

  setPosition(r: number, c: number, currR: number, currC: number) {
    return r === currR && c === currC;
  }

  setNewPosition(board: IBoard[]) {
    this.cells = board;
  }

  setStartedPosition() {
    const colors: ["white", "black"] = ["white", "black"];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const color = colors[(row + col) % 2];

        const figure = this.setFigurePositions(row, col);

        this.cells.push({ row, col, color, figure });
      }
    }
  }

  private setFigurePositions(row: number, col: number) {
    return (
      this.addPown(row, col) ||
      this.addRook(row, col) ||
      this.addKnight(row, col) ||
      this.addBishop(row, col) ||
      this.addKing(row, col) ||
      this.addQueen(row, col)
    );
  }

  addPown(r: number, c: number): Pown | undefined {
    if (this.setPosition(r, c, 1, c)) return new Pown("black", r, c);
    if (this.setPosition(r, c, 6, c)) return new Pown("white", r, c);
  }

  addRook(r: number, c: number): Rook | undefined {
    if (this.setPosition(r, c, 0, 0)) return new Rook("black", r, c);
    if (this.setPosition(r, c, 0, 7)) return new Rook("black", r, c);
    if (this.setPosition(r, c, 7, 0)) return new Rook("white", r, c);
    if (this.setPosition(r, c, 7, 7)) return new Rook("white", r, c);
  }

  addKnight(r: number, c: number): Knight | undefined {
    if (this.setPosition(r, c, 0, 6)) return new Knight("black", r, c);
    if (this.setPosition(r, c, 0, 1)) return new Knight("black", r, c);
    if (this.setPosition(r, c, 7, 1)) return new Knight("white", r, c);
    if (this.setPosition(r, c, 7, 6)) return new Knight("white", r, c);
  }

  addBishop(r: number, c: number): Bishop | undefined {
    if (this.setPosition(r, c, 0, 2)) return new Bishop("black", r, c);
    if (this.setPosition(r, c, 0, 5)) return new Bishop("black", r, c);
    if (this.setPosition(r, c, 7, 2)) return new Bishop("white", r, c);
    if (this.setPosition(r, c, 7, 5)) return new Bishop("white", r, c);
  }

  addKing(r: number, c: number): King | undefined {
    if (this.setPosition(r, c, 0, 4)) return new King("black", r, c);
    if (this.setPosition(r, c, 7, 4)) return new King("white", r, c);
  }

  addQueen(r: number, c: number): Queen | undefined {
    if (this.setPosition(r, c, 0, 3)) return new Queen("black", r, c);
    if (this.setPosition(r, c, 7, 3)) return new Queen("white", r, c);
  }
}
