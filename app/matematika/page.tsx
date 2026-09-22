export default function MatematikaPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">🧮 Matematika</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Důležité vzorce</h2>
        <ul className="space-y-4">
          <li><strong>Kvadratická rovnice:</strong> ax² + bx + c = 0</li>
          <li><strong>Pythagorova věta:</strong> a² + b² = c²</li>
          <li><strong>Obsah kruhu:</strong> π × r²</li>
          <li><strong>Objem koule:</strong> (4/3) × π × r³</li>
        </ul>
      </div>
    </div>
  );
}
