import Link from "next/link";
import { getData } from "@/lib/getData";

// Define Civilization Type
type CivilizationData = {
  leaders: string[];
  victory_types: string[];
  unique_units: string[];
  wonders: string[];
  description: string;
  icon?: string; // Optional icon property
};

export default async function Civilizations() {
  const json = await getData();
  const civilizations: Record<string, CivilizationData> = json.civilizations;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">

      {/* 🏛 Header */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 sm:mb-10 text-gray-900 text-center flex items-center justify-center gap-2 sm:gap-3">
        <span className="text-4xl sm:text-5xl">🏛</span> Civilizations
      </h1>
      <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12">
        Explore different civilizations, their unique strengths, and their legendary leaders.
      </p>

      {/* 🌍 Civilizations Grid */}
      {Object.keys(civilizations).length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No civilizations available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {Object.entries(civilizations).map(([civ, data]) => (
            <Link key={civ} href={`/civilizations/${civ}`} className="group">
              <div className="relative bg-white p-6 sm:p-8 gap-4 rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:scale-105 border border-gray-200 overflow-hidden flex justify-start min-h-full">
                <span className="text-5xl sm:text-4xl">{data.icon || "🏛"}</span>
                {/* 🏛 Civilization Title & Icon */}
                <div className="flex-1 items-center gap-3 mb-3">

                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                    {civ}
                  </h2>
                  {/* 📜 Civilization Description */}
                  <p className="text-sm sm:text-md text-gray-600 leading-snug flex-1 mt-1">
                    {data.description.length > 90 ? `${data.description.substring(0, 90)}...` : data.description}
                  </p>
                </div>

                {/* 🌿 Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent opacity-30"></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
