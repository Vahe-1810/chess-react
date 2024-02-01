import { useEffect } from "react";
import Chessboard from "./ChessBoard";

function App() {
  useEffect(() => {
    console.log("call");
  }, []);

  return (
    <div className="app">
      <Chessboard />
    </div>
  );
}

export default App;
