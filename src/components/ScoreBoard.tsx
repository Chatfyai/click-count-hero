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
        className="flex-1 flex flex-col items-center justify-center bg-blue-team active:bg-blue-team-active transition-all duration-200 touch-manipulation active:brightness-95"
      >
        <span className="text-[180px] font-bold text-white leading-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          {blueScore}
        </span>
        <span className="text-white/70 text-base mt-3 uppercase tracking-wider font-medium">
          Toque para adicionar
        </span>
      </button>

      {/* Control Buttons */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex gap-4">
        <Button
          onClick={() => decreaseScore("blue")}
          size="lg"
          className="bg-blue-team hover:bg-blue-team-active text-white rounded-full w-16 h-16 p-0 shadow-[0_6px_0_0_hsl(217_91%_45%),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_0_0_hsl(217_91%_45%),0_8px_16px_-5px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_0_hsl(217_91%_45%),0_4px_10px_-3px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          disabled={blueScore === 0}
        >
          <Minus className="w-7 h-7" />
        </Button>
        <Button
          onClick={resetScores}
          size="lg"
          className="bg-reset-button hover:bg-reset-button-hover text-white rounded-full w-16 h-16 p-0 shadow-[0_6px_0_0_hsl(240_5%_18%),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_0_0_hsl(240_5%_18%),0_8px_16px_-5px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_0_hsl(240_5%_18%),0_4px_10px_-3px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all"
        >
          <RotateCcw className="w-7 h-7" />
        </Button>
        <Button
          onClick={() => decreaseScore("red")}
          size="lg"
          className="bg-red-team hover:bg-red-team-active text-white rounded-full w-16 h-16 p-0 shadow-[0_6px_0_0_hsl(0_84%_45%),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_0_0_hsl(0_84%_45%),0_8px_16px_-5px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_0_hsl(0_84%_45%),0_4px_10px_-3px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          disabled={redScore === 0}
        >
          <Minus className="w-7 h-7" />
        </Button>
        {history.length > 0 && (
          <Button
            onClick={undo}
            size="lg"
            className="bg-reset-button hover:bg-reset-button-hover text-white rounded-full w-16 h-16 p-0 shadow-[0_6px_0_0_hsl(240_5%_18%),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_0_0_hsl(240_5%_18%),0_8px_16px_-5px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_0_hsl(240_5%_18%),0_4px_10px_-3px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all"
          >
            <Undo className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Red Team Score */}
      <button
        onClick={() => addScore("red")}
        className="flex-1 flex flex-col items-center justify-center bg-red-team active:bg-red-team-active transition-all duration-200 touch-manipulation active:brightness-95"
      >
        <span className="text-white/70 text-base mb-3 uppercase tracking-wider font-medium">
          Toque para adicionar
        </span>
        <span className="text-[180px] font-bold text-white leading-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          {redScore}
        </span>
      </button>
    </div>
  );
};

export default ScoreBoard;
