import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

const ANIMATION_DURATION = 260;

type AnimationDirection = "up" | "down" | null;

const AnimatedScore = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [direction, setDirection] = useState<AnimationDirection>(null);

  useEffect(() => {
    if (value === displayValue) {
      return;
    }

    const nextDirection: Exclude<AnimationDirection, null> =
      value > displayValue ? "up" : "down";

    setPreviousValue(displayValue);
    setDirection(nextDirection);

    const timeout = setTimeout(() => {
      setDisplayValue(value);
      setPreviousValue(null);
      setDirection(null);
    }, ANIMATION_DURATION);

    return () => clearTimeout(timeout);
  }, [value, displayValue]);

  return (
    <div className="relative h-[200px] w-full">
      {previousValue !== null && (
        <span
          className={`score-number ${className ?? ""} ${
            direction === "up"
              ? "score-animate-out-down"
              : "score-animate-out-up"
          }`}
        >
          {previousValue}
        </span>
      )}
      <span
        className={`score-number ${className ?? ""} ${
          direction
            ? direction === "up"
              ? "score-animate-in-up"
              : "score-animate-in-down"
            : ""
        }`}
      >
        {displayValue}
      </span>
    </div>
  );
};

const ScoreBoard = () => {
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  const addScore = (team: "blue" | "red") => {
    if (team === "blue") {
      setBlueScore(blueScore + 1);
    } else {
      setRedScore(redScore + 1);
    }
  };

  const decreaseScore = (team: "blue" | "red") => {
    if (team === "blue" && blueScore > 0) {
      setBlueScore(blueScore - 1);
    } else if (team === "red" && redScore > 0) {
      setRedScore(redScore - 1);
    }
  };

  const resetScores = () => {
    setBlueScore(0);
    setRedScore(0);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-background relative overflow-hidden">
      {/* Blue Team Score */}
      <button
        onClick={() => addScore("blue")}
        className="flex-1 flex flex-col items-center justify-center bg-blue-team active:bg-blue-team-active transition-all duration-200 touch-manipulation active:brightness-95"
      >
        <AnimatedScore
          value={blueScore}
          className="text-responsive-score font-bold text-white leading-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
        />
        <span className="text-white/70 text-base mt-3 uppercase tracking-wider font-medium">
          Toque para adicionar
        </span>
      </button>

      {/* Control Buttons */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-4 border border-white/30 rounded-full bg-black/40 backdrop-blur px-5 py-3 shadow-lg">
          <Button
            onClick={() => decreaseScore("blue")}
            size="lg"
            className="bg-blue-team hover:bg-blue-team-active text-white rounded-full w-16 h-16 p-0 shadow-[0_6px_0_0_hsl(217_91%_45%),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_0_0_hsl(217_91%_45%),0_8px_16px_-5px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_0_hsl(217_91%_45%),0_4px_10px_-3px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={blueScore === 0}
          >
            <Minus className="w-7 h-7" />
          </Button>
          <div
            onClick={resetScores}
            className="px-6 text-white font-semibold tracking-wide uppercase cursor-pointer select-none"
          >
            Reiniciar
          </div>
          <Button
            onClick={() => decreaseScore("red")}
            size="lg"
            className="bg-red-team hover:bg-red-team-active text-white rounded-full w-16 h-16 p-0 shadow-[0_6px_0_0_hsl(0_84%_45%),0_10px_20px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_0_0_hsl(0_84%_45%),0_8px_16px_-5px_rgba(0,0,0,0.5)] active:shadow-[0_2px_0_0_hsl(0_84%_45%),0_4px_10px_-3px_rgba(0,0,0,0.5)] active:translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={redScore === 0}
          >
            <Minus className="w-7 h-7" />
          </Button>
        </div>
      </div>

      {/* Red Team Score */}
      <button
        onClick={() => addScore("red")}
        className="flex-1 flex flex-col items-center justify-center bg-red-team active:bg-red-team-active transition-all duration-200 touch-manipulation active:brightness-95"
      >
        <span className="text-white/70 text-base mb-3 uppercase tracking-wider font-medium">
          Toque para adicionar
        </span>
        <AnimatedScore
          value={redScore}
          className="text-responsive-score font-bold text-white leading-none select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
        />
      </button>
    </div>
  );
};

export default ScoreBoard;
