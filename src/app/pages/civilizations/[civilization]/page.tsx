import { getData } from "@/lib/getData";
import { linkEntities } from "@/lib/linkEntities";
import Link from "next/link";

// ✅ Generate Static Params for SSG
export async function generateStaticParams() {
  const json = await getData();
  return Object.keys(json.civilizations).map((civilization) => ({
    civilization: encodeURIComponent(civilization.replace(/\s+/g, "-").toLowerCase()),
  }));
}

// ✅ Slugify function for consistent linking
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default async function CivilizationPage({ params }: { params: { civilization: string } }) {
  // ✅ Ensure params is fully resolved before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const civilization = resolvedParams.civilization;
  
  if (!civilization) return <p className="text-center text-gray-600">Civilization not found.</p>;

  const json = await getData();
  const civilizations: Record<string, any> = json.civilizations;
  
  // ✅ Normalize civilization names with proper decoding
  const normalizedCivilization = decodeURIComponent(civilization).replace(/-/g, " ").trim().toLowerCase();
  
  const civilizationKey = Object.keys(civilizations).find(
    (key) => key.toLowerCase().trim() === normalizedCivilization
  );
  
  if (!civilizationKey) return <p className="text-center text-gray-600">Civilization not found.</p>;

  const civData = civilizations[civilizationKey];

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🌍 Civilization Header */}
      <div className="text-center mb-6 sm:mb-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-white flex items-center justify-center gap-2">
          {civilizationKey}
        </h1>
      </div>

      {/* 📜 Civilization Description */}
      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 sm:mb-16 text-center" dangerouslySetInnerHTML={{ __html: linkEntities(civData.description) }} />

      {/* 🔹 Civilization Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 👑 Leaders */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">{civData.icon || "👑"}</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Leaders</h2>
            <p className="text-sm sm:text-md text-gray-400 mb-1">Influential rulers who shaped history.</p>
            <ul className="list-disc pl-5 mt-1 text-sm sm:text-md text-gray-600">
              {civData.leaders.map((leader: string) => (
                <li key={leader}>
                  <Link href={`/leaders/${slugify(leader)}`} className="text-blue-600 hover:underline">
                    {leader}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🏆 Victory Types */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🏆</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Victory Types</h2>
            <p className="text-sm sm:text-md text-gray-400 mb-1">Paths to domination and success.</p>
            <ul className="list-disc pl-5 mt-1 text-sm sm:text-md text-gray-600">
              {civData.victory_types.map((type: string) => (
                <li key={type}>
                  <Link href={`/victory/${slugify(type)}`} className="text-blue-600 hover:underline">
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ⚔️ Unique Units */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">⚔️</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Unique Units</h2>
            <p className="text-sm sm:text-md text-gray-400 mb-1">Specialized units that define your army.</p>
            <ul className="list-disc pl-5 mt-1 text-sm sm:text-md text-gray-600">
              {civData.unique_units.map((unit: string) => (
                <li key={unit}>
                  <Link href={`/units/${slugify(unit)}`} className="text-blue-600 hover:underline">
                    {unit}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🏛 Wonders */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🏛</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Wonders</h2>
            <p className="text-sm sm:text-md text-gray-400 mb-1">Monuments that define civilizations.</p>
            <ul className="list-disc pl-5 mt-1 text-sm sm:text-md text-gray-600">
              {civData.wonders.map((wonder: string) => (
                <li key={wonder}>
                  <Link href={`/wonders/${slugify(wonder)}`} className="text-blue-600 hover:underline">
                    {wonder}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 📜 Historical Relations */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
        <span className="text-3xl sm:text-4xl">📜</span>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Historical Relations</h2>
          <p className="text-sm sm:text-md text-gray-700 leading-relaxed mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(civData.historical_relations) }} />
        </div>
      </div>
    </div>
  );
}