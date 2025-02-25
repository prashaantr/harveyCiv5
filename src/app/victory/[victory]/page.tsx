import { getData } from "@/lib/getData";
import { linkEntities } from "@/lib/linkEntities";
import Link from "next/link";

// ✅ Slugify function to maintain consistency
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default async function VictoryPage({ params }: { params: { victory: string } }) {
  // ✅ Ensure params is fully resolved before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const victory = resolvedParams.victory;
  
  if (!victory) return <p className="text-center text-gray-600">Victory Type not found.</p>;

  const json = await getData();
  
  // ✅ Normalize Victory Type
  const victoryKey = Object.keys(json.victory_types).find(
    (key) => key.toLowerCase() === decodeURIComponent(victory).replace(/-/g, " ").toLowerCase()
  );

  if (!victoryKey) return <p className="text-center text-gray-600">Victory Type not found.</p>;

  const victoryData = json.victory_types[victoryKey as keyof typeof json.victory_types];

  return (
    <div className="py-10 px-4 sm:px-6 max-w-4xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🏆 Victory Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-2 sm:gap-3">
          <span>{victoryKey} Victory</span>
        </h1>
        <p className="text-base sm:text-xl text-gray-700 mt-4 sm:mt-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: linkEntities(victoryData.description) }} />
      </div>

      {/* 🏛 Best Civilizations Grid */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-10 text-center">🏛 Best Civilizations for {victoryKey} Victory</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {victoryData.best_civilizations.map((civ: string) => (
          <Link key={civ} href={`/civilizations/${slugify(civ)}`} className="group">
            <div className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 border border-gray-300 hover:border-gray-500 overflow-hidden flex flex-col items-center text-center">
              
              {/* 🏛 Civilization Name */}
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                {civ}
              </h2>

              {/* 🌿 Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/40 to-transparent opacity-30"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}