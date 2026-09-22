"use client";

import { useState } from "react";
import { evaluate } from "mathjs";
import Calculator from "@/components/Calculator";

export default function KalkulackaPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🧮 Vědecká Kalkulačka</h1>
      <Calculator />
    </div>
  );
}
