"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState("");
  const [shouldReset, setShouldReset] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("math");

  const updateDisplay = (value: string) => {
    setDisplay(value);
    setCurrentValue(value);
  };

  const appendNumber = (num: string) => {
    let newValue = currentValue;
    
    if (shouldReset) {
      newValue = num;
      setShouldReset(false);
    } else {
      if (newValue === "0" && num !== ".") {
        newValue = num;
      } else if (num === "." && newValue.includes(".")) {
        return;
      } else {
        newValue += num;
      }
    }
    
    updateDisplay(newValue);
  };

  const appendOperator = (op: string) => {
    if (operator !== "" && !shouldReset) {
      calculate(op);
    }
    setPreviousValue(currentValue);
    setOperator(op);
    setShouldReset(true);
  };

  const appendFunction = (func: string) => {
    const num = parseFloat(currentValue);
    let result = 0;

    switch(func) {
      case "sqrt":
        result = Math.sqrt(num);
        break;
      case "pow2":
        result = num * num;
        break;
      case "pow3":
        result = num * num * num;
        break;
      case "sin":
        result = Math.sin((num * Math.PI) / 180);
        break;
      case "cos":
        result = Math.cos((num * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((num * Math.PI) / 180);
        break;
      case "log":
        result = Math.log10(num);
        break;
      case "ln":
        result = Math.log(num);
        break;
      case "exp":
        result = Math.exp(num);
        break;
    }

    result = Math.round(result * 1000000000000) / 1000000000000;
    addToHistory(`${func}(${num}) = ${result}`);
    updateDisplay(result.toString());
  };

  const insertConstant = (value: number) => {
    updateDisplay(value.toString());
    setShouldReset(true);
  };

  const calculate = (nextOp?: string) => {
    if (operator === "" || previousValue === "") return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result = 0;

    switch(operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = current !== 0 ? prev / current : 0;
        break;
    }

    result = Math.round(result * 1000000000000) / 1000000000000;
    addToHistory(`${previousValue} ${operator} ${currentValue} = ${result}`);
    updateDisplay(result.toString());
    setOperator("");
    setPreviousValue("");
    setShouldReset(true);

    if (nextOp) {
      setPreviousValue(result.toString());
      setOperator(nextOp);
      setShouldReset(true);
    }
  };

  const clearDisplay = () => {
    updateDisplay("0");
    setPreviousValue("");
    setOperator("");
    setShouldReset(false);
  };

  const deleteLast = () => {
    if (currentValue.length > 1) {
      updateDisplay(currentValue.slice(0, -1));
    } else {
      updateDisplay("0");
    }
  };

  const toggleSign = () => {
    const num = parseFloat(currentValue);
    updateDisplay((-num).toString());
  };

  const addToHistory = (entry: string) => {
    setHistory(prev => [entry, ...prev.slice(0, 9)]);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-8">
            🔬 Vědecká kalkulačka
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hlavní kalkulačka */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                {/* Display */}
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-4 border-purple-500 rounded-2xl p-8 mb-8 text-right text-6xl font-bold text-gray-800 break-words min-h-32 flex items-center justify-end overflow-auto">
                  {display}
                </div>

                {/* Tlačítka */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { text: "7", type: "number" },
                    { text: "8", type: "number" },
                    { text: "9", type: "number" },
                    { text: "/", type: "operator" },
                    { text: "4", type: "number" },
                    { text: "5", type: "number" },
                    { text: "6", type: "number" },
                    { text: "×", type: "operator", op: "*" },
                    { text: "1", type: "number" },
                    { text: "2", type: "number" },
                    { text: "3", type: "number" },
                    { text: "−", type: "operator", op: "-" },
                    { text: "0", type: "number" },
                    { text: ".", type: "number" },
                    { text: "+", type: "operator" },
                    { text: "±", type: "sign" },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (btn.type === "number") appendNumber(btn.text);
                        else if (btn.type === "operator") appendOperator(btn.op || btn.text);
                        else if (btn.type === "sign") toggleSign();
                      }}
                      className={
                        btn.type === "operator"
                          ? "bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 text-2xl rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-6 text-2xl rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                      }
                    >
                      {btn.text}
                    </button>
                  ))}
                </div>

                {/* C, Delete, = */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <button
                    onClick={clearDisplay}
                    className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-6 text-2xl rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                  >
                    C (Vymazat)
                  </button>
                  <button
                    onClick={deleteLast}
                    className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-6 text-2xl rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                  >
                    ⌫ (Smazat)
                  </button>
                </div>

                <button
                  onClick={() => calculate()}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-8 text-3xl rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95 mb-6"
                >
                  = (Výsledek)
                </button>

                {/* Vědecké funkce */}
                <div className="border-t-4 pt-8">
                  <h3 className="text-2xl font-bold text-purple-600 mb-6 uppercase tracking-wider">
                    Vědecké funkce
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { text: "√", func: "sqrt" },
                      { text: "x²", func: "pow2" },
                      { text: "x³", func: "pow3" },
                      { text: "sin", func: "sin" },
                      { text: "cos", func: "cos" },
                      { text: "tan", func: "tan" },
                      { text: "log", func: "log" },
                      { text: "ln", func: "ln" },
                      { text: "eˣ", func: "exp" },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        onClick={() => appendFunction(btn.func)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 text-xl rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                      >
                        {btn.text}
                      </button>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-purple-600 mb-6 uppercase tracking-wider">
                    Fyzikální konstanty
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { text: "π", value: 3.14159265359 },
                      { text: "e", value: 2.71828182846 },
                      { text: "g", value: 9.81 },
                      { text: "c", value: 299792458 },
                      { text: "h", value: 6.62607015e-34 },
                      { text: "eₚ", value: 1.602176634e-19 },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        onClick={() => insertConstant(btn.value)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg rounded-xl transition transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                      >
                        {btn.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tabulky button */}
              <div className="mb-8">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-2xl transition transform hover:-translate-y-1 hover:shadow-lg text-2xl"
                >
                  📚 Otevřít tabulky
                </button>
              </div>

              {/* Historie */}
              {history.length > 0 && (
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold text-purple-600 mb-6 uppercase">
                    📊 Historie
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {history.map((item, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500 text-lg font-mono text-gray-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-96 overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-8 flex justify-between items-center sticky top-0">
              <h2 className="text-4xl font-bold">📚 Vědecké tabulky</h2>
              <button
                onClick={() => setShowModal(false)}
                className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white rounded-full w-14 h-14 flex items-center justify-center transition text-3xl"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex gap-4 mb-8 border-b-4 flex-wrap">
                {["math", "physics", "chemistry"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={
                      activeTab === tab
                        ? "pb-4 px-6 font-bold text-xl text-purple-600 border-b-4 border-purple-600"
                        : "pb-4 px-6 font-bold text-xl text-gray-600 hover:text-purple-600"
                    }
                  >
                    {tab === "math" && "Matematika"}
                    {tab === "physics" && "Fyzika"}
                    {tab === "chemistry" && "Chemie"}
                  </button>
                ))}
              </div>

              {/* Matematika */}
              {activeTab === "math" && (
                <div>
                  <h3 className="text-2xl text-purple-600 font-bold mb-4 uppercase">Goniometrické funkce</h3>
                  <table className="w-full text-lg mb-8">
                    <thead className="bg-gray-100 border-b-4 border-purple-500">
                      <tr>
                        <th className="p-4 text-left">Úhel (°)</th>
                        <th className="p-4 text-left">sin</th>
                        <th className="p-4 text-left">cos</th>
                        <th className="p-4 text-left">tan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["0°", "0", "1", "0"],
                        ["30°", "0,5", "0,866", "0,577"],
                        ["45°", "0,707", "0,707", "1"],
                        ["60°", "0,866", "0,5", "1,732"],
                        ["90°", "1", "0", "∞"],
                      ].map((row, i) => (
                        <tr key={i} className="border-b hover:bg-purple-50">
                          {row.map((cell, j) => (
                            <td key={j} className="p-4">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Fyzika */}
              {activeTab === "physics" && (
                <div>
                  <h3 className="text-2xl text-purple-600 font-bold mb-4 uppercase">Fyzikální konstanty</h3>
                  <table className="w-full text-lg">
                    <thead className="bg-gray-100 border-b-4 border-purple-500">
                      <tr>
                        <th className="p-4 text-left">Konstanta</th>
                        <th className="p-4 text-left">Hodnota</th>
                        <th className="p-4 text-left">Jednotka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Rychlost světla (c)", "299 792 458", "m/s"],
                        ["Gravitační konstanta (G)", "6,674 × 10⁻¹¹", "m³ kg⁻¹ s⁻²"],
                        ["Planckova konstanta (h)", "6,626 × 10⁻³⁴", "J·s"],
                        ["Elementární náboj (e)", "1,602 × 10⁻¹⁹", "C"],
                      ].map((row, i) => (
                        <tr key={i} className="border-b hover:bg-purple-50">
                          {row.map((cell, j) => (
                            <td key={j} className="p-4">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Chemie */}
              {activeTab === "chemistry" && (
                <div>
                  <h3 className="text-2xl text-purple-600 font-bold mb-4 uppercase">Molární hmotnosti prvků</h3>
                  <table className="w-full text-lg">
                    <thead className="bg-gray-100 border-b-4 border-purple-500">
                      <tr>
                        <th className="p-4 text-left">Prvek</th>
                        <th className="p-4 text-left">Symbol</th>
                        <th className="p-4 text-left">g/mol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Vodík", "H", "1,008"],
                        ["Uhlík", "C", "12,01"],
                        ["Dusík", "N", "14,01"],
                        ["Kyslík", "O", "16,00"],
                        ["Sodík", "Na", "22,99"],
                        ["Hořčík", "Mg", "24,31"],
                        ["Vápník", "Ca", "40,08"],
                      ].map((row, i) => (
                        <tr key={i} className="border-b hover:bg-purple-50">
                          {row.map((cell, j) => (
                            <td key={j} className="p-4">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
