import Link from "next/link";
import { getData } from "@/lib/getData";

// ✅ Define `ResourceType` for type safety
interface ResourceType {
  icon: string;
  description: string;
  tooltip?: string;
}

// ✅ Fetch and properly type resources
export default async function ResourcesPage() {
  const json = await getData();

  if (!json.resources) {
    return <p className="text-center text-gray-600">No resources found.</p>;
  }

  const resources: Record<string, ResourceType> = json.resources;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🏞️ Page Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8 sm:mb-10 text-gray-900 text-center flex items-center justify-center gap-2 sm:gap-3">
        🏞️ Resources
      </h1>
      <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12">
        Resources are crucial for trade, economy, and military power. Manage them wisely to gain an edge over rival civilizations.
      </p>

      {/* 🌍 Resources Grid */}
      {Object.keys(resources).length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No resources available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(resources).map(([name, data]) => (
            <Link 
              key={name} 
              href={`/resources/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"))}`} 
              className="group"
            >
              <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105 min-h-full">
                <span className="text-6xl sm:text-4xl">{data.icon}</span>
                {/* 📜 Resource Title & Icon */}
                <div className="flex-1 mt-1 sm:mt-0">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                    {name}
                  </h2>
                  {/* 📖 Resource Description */}
                  <p className="text-sm sm:text-md text-gray-600 leading-snug mt-2">
                    {data.description.length > 100 ? `${data.description.substring(0, 100)}...` : data.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
