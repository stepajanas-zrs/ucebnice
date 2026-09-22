"use client";

import { useState } from "react";

const FYZIKA_KONSTANTY = [
  { nazev: "Gravitační konstanta", symbol: "G", hodnota: "6.674 × 10⁻¹¹", jednotka: "m³ kg⁻¹ s⁻²" },
  { nazev: "Rychlost světla", symbol: "c", hodnota: "299 792 458", jednotka: "m/s" },
  { nazev: "Planckova konstanta", symbol: "h", hodnota: "6.62607 × 10⁻³⁴", jednotka: "J·s" },
  { nazev: "Elementární náboj", symbol: "e", hodnota: "1.602 × 10⁻¹⁹", jednotka: "C" },
  { nazev: "Boltzmannova konstanta", symbol: "k", hodnota: "1.381 × 10⁻²³", jednotka: "J/K" },
  { nazev: "Avogadrova konstanta", symbol: "Nₐ", hodnota: "6.022 × 10²³", jednotka: "mol⁻¹" },
];

export default function FyzikaTabulky() {
  const [search, setSearch] = useState("");

  const filtered = FYZIKA_KONSTANTY.filter((k) =>
    k.nazev.toLowerCase().includes(search.toLowerCase()) ||
    k.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Hledej konstantu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded mb-6"
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Název</th>
              <th className="p-3 text-left">Symbol</th>
              <th className="p-3 text-left">Hodnota</th>
              <th className="p-3 text-left">Jednotka</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{k.nazev}</td>
                <td className="p-3 font-mono">{k.symbol}</td>
                <td className="p-3 font-mono">{k.hodnota}</td>
                <td className="p-3">{k.jednotka}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
