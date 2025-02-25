import Link from "next/link";
import { getData } from "../../lib/getData"; 

export default async function Leaders() {
  const json = await getData();
  const leaders = json.leaders;

  return (
    <div className="py-16 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      {/* Page Header */}
      <h1 
        className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 sm:mb-8 text-gray-900 text-center" 
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        👑 Civilization Leaders
      </h1>
      <p className="text-base sm:text-lg text-gray-700 text-center mb-8 sm:mb-10">
        Meet the leaders who shaped their civilizations and led them to greatness.
      </p>

      {/* Leaders Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {Object.entries(leaders).map(([leader, data]) => (
          <Link 
            href={`/leaders/${leader}`} 
            key={leader} 
            className="group"
          >
            <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105">
              {/* Leader Icon */}
              <div className="text-5xl sm:text-4xl flex-shrink-0">{data.icon || "👤"}</div>
              {/* Leader Name or Description */}
              <div className="flex-1 mt-1 sm:mt-0">
                {/* Leader Name */}
                <h2 
                  className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition" 
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {leader}
                </h2>

                {/* Leader Description */}
                <p className="text-sm sm:text-md text-gray-600 mt-2">
                  {data.description.length > 150 ? `${data.description.substring(0, 150)}...` : data.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
