import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Undo, Minus } from "lucide-react";

const ScoreBoard = () => {
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [history, setHistory] = useState<{ blue: number; red: number }[]>([]);

  const addScore = (team: "blue" | "red") => {
    setHistory([...history, { blue: blueScore, red: redScore }]);
    if (team === "blue") {
      setBlueScore(blueScore + 1);
    } else {
      setRedScore(redScore + 1);
    }
  };

  const decreaseScore = (team: "blue" | "red") => {
    if (team === "blue" && blueScore > 0) {
      setHistory([...history, { blue: blueScore, red: redScore }]);
      setBlueScore(blueScore - 1);
    } else if (team === "red" && redScore > 0) {
      setHistory([...history, { blue: blueScore, red: redScore }]);
      setRedScore(redScore - 1);
    }
  };

  const resetScores = () => {
    setHistory([...history, { blue: blueScore, red: redScore }]);
    setBlueScore(0);
    setRedScore(0);
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setBlueScore(lastState.blue);
      setRedScore(lastState.red);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-background relative overflow-hidden">
      {/* Blue Team Score */}
      <button
        onClick={() => addScore("blue")}
        className="flex-1 flex flex-col items-center justify-center bg-blue-team active:bg-blue-team-active transition-all duration-150 touch-manipulation"
      >
        <span className="text-[160px] font-bold text-white leading-none select-none">
          {blueScore}
        </span>
        <span className="text-white/60 text-sm mt-2 uppercase tracking-wider">
          Toque para adicionar
        </span>
      </button>

      {/* Control Buttons */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex gap-3">
        <Button
          onClick={() => decreaseScore("blue")}
          size="lg"
          className="bg-blue-team hover:bg-blue-team-active text-white rounded-full w-14 h-14 p-0 shadow-[0_6px_0_0_hsl(var(--blue-team-active)),0_8px_12px_-2px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_0_hsl(var(--blue-team-active)),0_4px_8px_-2px_rgba(0,0,0,0.4)] active:translate-y-1 transition-all"
          disabled={blueScore === 0}
        >
          <Minus className="w-6 h-6" />
        </Button>
        <Button
          onClick={resetScores}
          size="lg"
          className="bg-reset-button hover:bg-reset-button-hover text-white rounded-full w-14 h-14 p-0 shadow-[0_6px_0_0_hsl(var(--accent)),0_8px_12px_-2px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_0_hsl(var(--accent)),0_4px_8px_-2px_rgba(0,0,0,0.4)] active:translate-y-1 transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => decreaseScore("red")}
          size="lg"
          className="bg-red-team hover:bg-red-team-active text-white rounded-full w-14 h-14 p-0 shadow-[0_6px_0_0_hsl(var(--red-team-active)),0_8px_12px_-2px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_0_hsl(var(--red-team-active)),0_4px_8px_-2px_rgba(0,0,0,0.4)] active:translate-y-1 transition-all"
          disabled={redScore === 0}
        >
          <Minus className="w-6 h-6" />
        </Button>
        {history.length > 0 && (
          <Button
            onClick={undo}
            size="lg"
            className="bg-reset-button hover:bg-reset-button-hover text-white rounded-full w-14 h-14 p-0 shadow-[0_6px_0_0_hsl(var(--accent)),0_8px_12px_-2px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_0_hsl(var(--accent)),0_4px_8px_-2px_rgba(0,0,0,0.4)] active:translate-y-1 transition-all"
          >
            <Undo className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Red Team Score */}
      <button
        onClick={() => addScore("red")}
        className="flex-1 flex flex-col items-center justify-center bg-red-team active:bg-red-team-active transition-all duration-150 touch-manipulation"
      >
        <span className="text-white/60 text-sm mb-2 uppercase tracking-wider">
          Toque para adicionar
        </span>
        <span className="text-[160px] font-bold text-white leading-none select-none">
          {redScore}
        </span>
      </button>
    </div>
  );
};

export default ScoreBoard;
