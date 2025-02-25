import { getData } from "@/lib/getData";
import Link from "next/link";

// ✅ Define `WonderType`
interface WonderType {
  icon?: string;
  description: string;
  benefits: string;
  historical_context: string;
  trivia: string;
  civilization: string;
}

// ✅ Slugify function for URLs
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default async function WondersPage() {
  const json = await getData();
  
  if (!json.wonders) {
    return <p className="text-center text-gray-600">No wonders found.</p>;
  }

  const wonders: Record<string, WonderType> = json.wonders;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🏛 Page Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8 sm:mb-10 text-gray-900 text-center flex items-center justify-center gap-2 sm:gap-3">
        🏛 World Wonders
      </h1>
      <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12">
        Wonders provide powerful bonuses to civilizations, enhancing culture, production, and scientific advancement.
      </p>

      {/* 🌍 Wonders Grid */}
      {Object.keys(wonders).length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No wonders available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(wonders).map(([name, data]) => (
            <Link key={name} href={`/wonders/${slugify(name)}`} className="group">
              <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105 min-h-full">
                <span className="text-5xl sm:text-4xl">{data.icon || "🏛️"}</span>
                {/* 🏛 Wonder Title & Icon */}
                <div className="flex-1 mt-1 sm:mt-0">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                    {name}
                  </h2>
                  {/* 📜 Wonder Description */}
                  <p className="text-sm sm:text-md text-gray-600 leading-snug mt-2">
                    {data.benefits.length > 100 ? `${data.benefits.substring(0, 100)}...` : data.benefits}
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
