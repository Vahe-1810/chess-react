import { AllFiguresType, ColorType, FiguresUtl } from "./types";
import bPown from "./assets/chess-figures/b-pown.png";
import wPown from "./assets/chess-figures/w-pown.png";
import bRook from "./assets/chess-figures/b-rook.png";
import wRook from "./assets/chess-figures/w-rook.png";
import bKnight from "./assets/chess-figures/b-knight.png";
import wKnight from "./assets/chess-figures/w-knight.png";
import bBishop from "./assets/chess-figures/b-bishop.png";
import wBishop from "./assets/chess-figures/w-bishop.png";
import bKing from "./assets/chess-figures/b-king.png";
import wKing from "./assets/chess-figures/w-king.png";
import bQueen from "./assets/chess-figures/b-queen.png";
import wQueen from "./assets/chess-figures/w-queen.png";
import { Board } from "./startPositions";

export class Figure {
  type: FiguresUtl;
  url: string;
  color: ColorType;
  r: number;
  c: number;
  vectors = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  constructor(r: number, c: number, type: FiguresUtl, color: ColorType, url: string) {
    this.type = type;
    this.url = url;
    this.color = color;
    this.r = r;
    this.c = c;
  }

  showMoves(board: Board) {
    return [{ r: 0, c: 0 }];
  }

  doMove(c: number, r: number): void {
    this.c = c;
    this.r = r;
  }
}

export class Pown extends Figure {
  didMove: boolean = false;
  move: 1 | -1 = this.color === "black" ? 1 : -1;

  constructor(color: ColorType, r: number, c: number) {
    const currUrl = color === "black" ? bPown : wPown;
    super(r, c, "pown", color, currUrl);
  }

  showMoves(board: Board) {
    const moveOne = board.cells.find(({ col, row }) => col === this.c && row === this.r + this.move)?.figure;
    const moveTwo = board.cells.find(({ col, row }) => col === this.c && row === this.r + this.move * 2)?.figure;

    if (!!moveOne) return [];
    else if (!!moveTwo) return [{ r: this.r + this.move, c: this.c }];
    else if (this.didMove) return [{ r: this.r + this.move, c: this.c }];
    return [
      { r: this.r + this.move, c: this.c },
      { r: this.r + 2 * this.move, c: this.c },
    ];
  }

  doMove(c: number, r: number): void {
    this.c = c;
    this.r = r;
    this.didMove = true;
  }
}

export class Rook extends Figure {
  didMove: boolean = false;

  constructor(color: ColorType, r: number, c: number) {
    const currUrl = color === "black" ? bRook : wRook;
    super(r, c, "rook", color, currUrl);
  }

  showMoves(board: Board): { r: number; c: number }[] {
    const possMoves = [];

    vector: for (let i = 0; i < 4; i++) {
      let x = this.r;
      let y = this.c;

      for (let j = 0; j < 14; j++) {
        if (x >= 0 && y >= 0 && x < 8 && y < 8) {
          x += this.vectors.slice(0, 4)[i][0];
          y += this.vectors.slice(0, 4)[i][1];

          const currPos = board.cells.find(({ col, row }) => col === y && row === x)?.figure;

          if (currPos) continue vector;

          possMoves.push({ r: x, c: y });
        }
      }
    }

    return possMoves;
  }

  // isOpenCheck(board: Board) {
  //   const currKing = board.cells.find(({ figure }) => figure?.type === "king" && figure.color === this.color)?.figure;
  //   const dX = currKing!.c - this.c > 0 ? -1 : 1;
  //   let hasFigure;
  //   let hasRookOrQueen;
  //   let blockVector: "row" | "col" | undefined;

  //   if (currKing?.r === this.r) {
  //     if (dX === 1) {
  //       for (let i = this.c - 1; i > currKing.c; i--) {
  //         if (!!board.cells.find(({ col, row }) => row === this.r && col === i)?.figure) {
  //           hasFigure = true;
  //           break;
  //         }
  //         hasFigure = false;
  //       }

  //       for (let i = this.c + 1; i < 8; i++) {
  //         const fingQorR = board.cells.find(({ col, row }) => row === this.r && col === i)?.figure;
  //         if (!!fingQorR && fingQorR.color !== this.color && (fingQorR.type === "queen" || fingQorR.type === "rook")) {
  //           hasRookOrQueen = true;
  //           break;
  //         }
  //         hasRookOrQueen = false;
  //       }
  //     } else if (dX === -1) {
  //       for (let i = this.c + 1; i < currKing.c; i++) {
  //         if (!!board.cells.find(({ col, row }) => row === this.r && col === i)?.figure) {
  //           hasFigure = true;
  //           break;
  //         }
  //         hasFigure = false;
  //       }

  //       for (let i = this.c - 1; i > 0; i++) {
  //         const fingQorR = board.cells.find(({ col, row }) => row === this.r && col === i)?.figure;
  //         if (!!fingQorR && fingQorR.color !== this.color && (fingQorR.type === "queen" || fingQorR.type === "rook")) {
  //           hasRookOrQueen = true;
  //           break;
  //         }
  //         hasRookOrQueen = false;
  //       }
  //     }

  //     if (!hasFigure && !!hasRookOrQueen) blockVector = "row";
  //   }

  //   if (currKing?.c === this.c) {
  //     if (dX === 1) {
  //       for (let i = this.r - 1; i > currKing.r; i--) {
  //         if (!!board.cells.find(({ col, row }) => col === this.c && row === i)?.figure) {
  //           hasFigure = true;
  //           break;
  //         }
  //         hasFigure = false;
  //       }

  //       for (let i = this.r + 1; i < 8; i++) {
  //         const fingQorR = board.cells.find(({ col, row }) => col === this.c && row === i)?.figure;
  //         if (!!fingQorR && fingQorR.color !== this.color && (fingQorR.type === "queen" || fingQorR.type === "rook")) {
  //           hasRookOrQueen = true;
  //           break;
  //         }
  //         hasRookOrQueen = false;
  //       }
  //     } else if (dX === -1) {
  //       for (let i = this.r + 1; i < currKing.r; i++) {
  //         if (!!board.cells.find(({ col, row }) => col === this.c && row === i)?.figure) {
  //           hasFigure = true;
  //           break;
  //         }
  //         hasFigure = false;
  //       }

  //       for (let i = this.r - 1; i > 0; i++) {
  //         const fingQorR = board.cells.find(({ col, row }) => col === this.c && this.r === i)?.figure;
  //         if (!!fingQorR && fingQorR.color !== this.color && (fingQorR.type === "queen" || fingQorR.type === "rook")) {
  //           hasRookOrQueen = true;
  //           break;
  //         }
  //         hasRookOrQueen = false;
  //       }
  //     }

  //     if (!hasFigure && !!hasRookOrQueen) blockVector = "col";
  //   }
  //   return blockVector;
  // }

  doMove(c: number, r: number): void {
    this.c = c;
    this.r = r;
    this.didMove = true;
  }
}

export class Knight extends Figure {
  constructor(color: ColorType, r: number, c: number) {
    const currUrl = color === "black" ? bKnight : wKnight;
    super(r, c, "knight", color, currUrl);
  }

  showMoves(board: Board): { r: number; c: number }[] {
    const possMoves = [];

    let X = [2, 1, -1, -2, -2, -1, 1, 2];
    let Y = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let i = 0; i < 8; i++) {
      let x = this.r + X[i];
      let y = this.c + Y[i];

      if (x >= 0 && y >= 0 && x < 8 && y < 8) {
        const currPos = board.cells.find(({ col, row }) => col === y && row === x)?.figure;

        if (currPos) continue;

        possMoves.push({ r: x, c: y });
      }
    }

    return possMoves;
  }
}

export class Bishop extends Figure {
  constructor(color: ColorType, r: number, c: number) {
    const currUrl = color === "black" ? bBishop : wBishop;
    super(r, c, "bishop", color, currUrl);
  }

  showMoves(board: Board): { r: number; c: number }[] {
    const possMoves = [];

    vector: for (let i = 0; i < 4; i++) {
      let x = this.r;
      let y = this.c;
      for (let j = 0; j < 8; j++) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
          x += this.vectors.slice(4)[i][0];
          y += this.vectors.slice(4)[i][1];

          const currPos = board.cells.find(({ col, row }) => col === y && row === x)?.figure;

          if (currPos) continue vector;

          possMoves.push({ r: x, c: y });
        } else continue vector;
      }
    }

    return possMoves;
  }
}

export class Queen extends Figure {
  constructor(color: ColorType, r: number, c: number) {
    const currUrl = color === "black" ? bQueen : wQueen;
    super(r, c, "queen", color, currUrl);
  }

  showMoves(board: Board): { r: number; c: number }[] {
    const possMoves = [];

    vector: for (let i = 0; i < 8; i++) {
      let x = this.r;
      let y = this.c;

      for (let j = 0; j < 22; j++) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
          x += this.vectors[i][0];
          y += this.vectors[i][1];

          const currPos = board.cells.find(({ col, row }) => col === y && row === x)?.figure;

          if (currPos) continue vector;

          possMoves.push({ r: x, c: y });
        }
      }
    }

    return possMoves;
  }
}

export class King extends Figure {
  didMove: boolean = false;
  canCastle: boolean = false;
  opensCheck: boolean = false;
  hasCheck: boolean = false;

  constructor(color: ColorType, r: number, c: number) {
    const currUrl = color === "black" ? bKing : wKing;
    super(r, c, "king", color, currUrl);
  }

  showMoves(board: Board): { r: number; c: number }[] {
    const possMoves = [];

    for (let i = 0; i < 8; i++) {
      let x = this.r;
      let y = this.c;

      x += this.vectors[i][0];
      y += this.vectors[i][1];
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const currPos = board.cells.find(({ col, row }) => col === y && row === x)?.figure;

        if (currPos) continue;
        possMoves.push({ r: x, c: y });
      }
    }

    return possMoves;
  }
}
