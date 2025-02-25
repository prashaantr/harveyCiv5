import { getData } from "@/lib/getData";
import Link from "next/link";
import { linkEntities } from "@/lib/linkEntities";

// Define TypeScript interfaces
interface Civilization {
  leaders: string[];
  victory_types: string[];
  unique_units: string[];
  wonders: string[];
  resources: string[];
  city_states: string[];
  technologies: string[];
  government: string;
  description: string;
  icon: string;
  tooltip: string;
}

interface VictoryType {
  icon: string;
  description: string;
  tooltip: string;
}

export default async function Home() {
  const json = await getData();
  const civilizations: Record<string, Civilization> = json.civilizations;
  const victoryTypes: Record<string, VictoryType> = Object.fromEntries(
    Object.entries(json.victory_types).map(([key, value]) => [
      key,
      {
        ...value,
        tooltip: value.description,
      },
    ])
  );

  // **SSR Fetch Example: Get a Random Civilization Image**
  const response = await fetch("https://picsum.photos/200");
  const randomImageUrl = response.url; 

  // Apply entity linking to page content
  const description1 = linkEntities(
    "Welcome to Prashaant's comprehensive guide to mastering Sid Meier's Civilization aX turn-based strategy game that redefines the iconic series with new ways to engage in world domination."
  );
  const description2 = linkEntities(
    "Lead a civilization from prehistoric times into the future on a procedurally generated map, achieving victory through research, exploration, diplomacy, expansion, economic development, government, and military conquest."
  );

  return (
    <div className="py-10 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 sm:mb-8 text-gray-900 text-center flex items-center justify-center gap-3">
         Prashaant's Civilization Guide
      </h1>

      {/* Introduction */}
      <p className="text-md sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: description1 }} />
      <p className="text-md sm:text-lg text-gray-700 mb-8 sm:mb-10 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: description2 }} />

      {/* Video Embed Area */}
      <div className="video-embed mb-8 sm:mb-10">
        <iframe
          width="100%"
          height="500"
          className="sm:h-400"
          src="https://www.youtube.com/embed/MGOdJMNN2b0?autoplay=1&si=8888888888888888"
          title="Civilization V Guide"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{ borderRadius: '24px', border: '8px solid #ccc' }}
        ></iframe>
      </div>

      <hr className="border-t border-gray-300 my-8 sm:my-12" />

      {/* 🏛 Civilizations Section */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 text-center flex items-center justify-center gap-3">
        <span className="text-3xl sm:text-4xl">🏛</span> Civilizations
      </h2>
      <p className="text-md sm:text-md text-gray-600 text-center mb-6 sm:mb-8">Explore different civilizations and their unique strengths.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {Object.entries(civilizations).map(([name, data]) => (
          <Link key={name} href={`/civilizations/${name}`} className="group">
            <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105">
              <span className="text-5xl sm:text-4xl opacity-80">{data.icon}</span>
              <div className="flex-1 mt-1 sm:mt-0">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                  {name}
                </h3>
                <p className="text-md sm:text-md text-gray-600 mt-1">{data.tooltip}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <hr className="border-t border-gray-300 my-12 sm:my-16" />

      {/* 🏆 Victory Paths */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 text-center flex items-center justify-center gap-3">
        <span className="text-3xl sm:text-4xl">🏆</span> Victory Paths
      </h2>
      <p className="text-md sm:text-md text-gray-600 text-center mb-6 sm:mb-8">Choose your path to ultimate domination.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {Object.entries(victoryTypes).map(([name, data]) => (
          <Link key={name} href={`/victory/${name.toLowerCase()}`} className="group">
            <div 
              className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105 min-h-full"
            >
              <span className="text-5xl sm:text-4xl opacity-80">{data.icon}</span>
              <div className="flex-1 mt-1 sm:mt-0">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                  {name} Victory
                </h3>
                <p className="text-md sm:text-md text-gray-600 mt-1">{data.description.length > 100 ? `${data.description.substring(0,100)}...` : data.description}</p>
              </div>
              <div className="absolute bg-[#333] text-white text-sm rounded-lg py-2 px-3 right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-lg hidden sm:block">
                {data.tooltip}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-t-8 border-t-gray-800 border-x-8 border-x-transparent"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <hr className="border-t border-gray-300 my-12 sm:my-16" />

      {/* 🌍 **SSR Example Section** - Fetch Random Image Dynamically */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900 text-center">
        🌍 **Random Image (SSR)**
      </h2>
      <p className="text-md sm:text-lg text-gray-600 text-center mb-6 sm:mb-8">
        This image is fetched dynamically on every page request using **Server-Side Rendering (SSR)**.
      </p>
      
      <div className="flex justify-center">
        <img 
          src={randomImageUrl} 
          alt="Random Civilization Image" 
          className="w-full max-w-3xl rounded-3xl shadow-lg border border-gray-300"
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        *This image is fetched from an external source (Picsum) and updates on every request.*
      </p>
      
    </div>
  );
}
