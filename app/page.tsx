export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Web Učebnice
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Vzdělávací platforma pro fyziku, matematiku a chemii
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card 
          title="📚 Fyzika" 
          href="/fyzika"
          description="Tabulky konstant, zákony, vzorce"
        />
        <Card 
          title="🧮 Matematika" 
          href="/matematika"
          description="Vzorce, grafy, kalkulačka"
        />
        <Card 
          title="⚗️ Chemie" 
          href="/chemie"
          description="Periodická tabulka, reakce"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card 
          title="🧮 Vědecká kalkulačka" 
          href="/kalkulacka"
          description="Pokročilé matematické výpočty"
        />
        <Card 
          title="📖 Učebnice" 
          href="/ucebnice"
          description="Digitální učebnice a sešity"
        />
      </div>
    </div>
  );
}

function Card({ title, href, description }: any) {
  return (
    <a href={href}>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </a>
  );
}
