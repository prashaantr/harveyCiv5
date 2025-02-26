import { getData } from "@/lib/getData";
import { linkEntities } from "@/lib/linkEntities";
import Link from "next/link";

// ✅ Slugify function for consistent URLs
const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

export default async function UnitPage({ params }: { params: { unit: string } }) {
  // Make sure params is fully resolved before accessing its properties
  const resolvedParams = await Promise.resolve(params);
  const unit = decodeURIComponent(resolvedParams.unit);

  const json = await getData();
  if (!json.units) return <p className="text-center text-gray-600">Error: No units available.</p>;

  // ✅ Normalize unit key (handle case-insensitive lookup)
  const unitKey = Object.keys(json.units).find((key) => slugify(key) === slugify(unit));

  if (!unitKey || !json.units[unitKey as keyof typeof json.units]) {
    return <p className="text-center text-gray-600">Unit not found.</p>;
  }

  const unitData = json.units[unitKey as keyof typeof json.units];

  return (
    <div className="py-10 px-4 sm:px-8 max-w-4xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* ⚔️ Unit Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-2 sm:gap-3">
           {unitKey}
        </h1>
        <p className="text-base sm:text-xl text-gray-700 mt-4 sm:mt-8" dangerouslySetInnerHTML={{ __html: linkEntities(unitData.description) }} />
      </div>

      {/* 🔹 Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        
        {/* 🏹 Unit Type */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl">🎖️</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Type</h2>
            <p className="text-2xl sm:text-md text-gray-600">{unitData.type}</p>
          </div>
        </div>

        {/* 💪 Strength */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl">💪</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Strength</h2>
            <p className="text-2xl sm:text-md text-gray-600">{unitData.strength}</p>
          </div>
        </div>
      </div>

      {/* 🏛 Used by Civilizations */}
      <div className="mt-8 sm:mt-12 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-3 sm:gap-4">
        <span className="text-3xl sm:text-4xl">🏛</span>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Civilizations</h2>
          <ul className="list-disc mt-1 text-lg sm:text-md text-gray-600">
            {unitData.civilizations.map((civ: string) => (
              <ul key={civ}>
                <Link href={`/civilizations/${slugify(civ)}`} className="text-blue-600 hover:underline">
                  {civ}
                </Link>
              </ul>
            ))}
          </ul>
        </div>
      </div>

      {/* 📜 Historical Context */}
      <div className="mt-8 sm:mt-12 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-3 sm:gap-4">
        <span className="text-3xl sm:text-4xl">📜</span>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Historical Context</h2>
          <p className="text-lg sm:text-md text-gray-700">{unitData.historical_context}</p>
        </div>
      </div>

      {/* 🗺️ Strategies */}
      <div className="mt-8 sm:mt-12 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-3 sm:gap-4">
        <span className="text-3xl sm:text-4xl">🗺️</span>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Strategies</h2>
          <p className="text-lg sm:text-md text-gray-700">{unitData.strategies}</p>
        </div>
      </div>
    </div>
  );
}