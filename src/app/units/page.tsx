import Link from "next/link";
import { getData } from "../../lib/getData"; 

// ✅ Slugify function for correct URL formatting
const slugify = (text: string) =>
  text
    .normalize("NFD") // Handle special characters like accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, "-") // Convert spaces to dashes
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric characters except dashes
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing dashes

// Define Unit Type
type UnitData = {
  icon?: string; // Optional icon property
  description: string;
};

export default async function Units() {
  const json = await getData();
  const units: Record<string, UnitData> = json.units;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* ⚔️ Page Header */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 sm:mb-8 text-gray-900 text-center flex items-center justify-center gap-2 sm:gap-3">
        <span className="text-4xl sm:text-6xl">⚔️</span> Units
      </h1>
      <p className="text-base sm:text-lg text-gray-700 text-center mb-8 sm:mb-10">
        Discover the different units available in Civilization V and their strategic uses.
      </p>

      {/* Units Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(units).map(([unit, data]) => (
          <Link href={`/units/${slugify(unit)}`} key={unit} className="group">
            <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105 min-h-full">
              
              {/* Icon + Title */}
              <span className="text-5xl sm:text-4xl opacity-80">{data.icon || "⚔️"}</span>
              <div className="flex-1 mt-1 sm:mt-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                  {unit}
                </h2>
                <p className="text-sm sm:text-md text-gray-600 mt-1">
                  {data.description.length > 80 ? data.description.substring(0, 80) + "..." : data.description}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
