"use client";

import { useState } from "react";
import { evaluate } from "mathjs";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    try {
      setError("");
      const res = evaluate(input);
      setResult(res.toString());
    } catch (err) {
      setError("Chyba ve výrazu");
      setResult("");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setError("");
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["sin(", "cos(", "tan(", "sqrt("],
    ["π", "e", "^", "!"],
  ];

  const handleButtonClick = (btn: string) => {
    if (btn === "=") {
      handleCalculate();
    } else if (btn === "C") {
      handleClear();
    } else {
      setInput(input + btn);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded text-lg"
          placeholder="Zadej výraz..."
        />
      </div>

      <div className="mb-4 p-3 bg-blue-100 rounded text-2xl font-bold">
        {result || error || "0"}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, i) => (
          <div key={i} className="contents">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className="p-3 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition"
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleClear}
        className="w-full mt-4 p-3 bg-red-500 text-white rounded font-bold hover:bg-red-600 transition"
      >
        Vymaž (C)
      </button>
    </div>
  );
}
