import { getData } from "@/lib/getData";
import { linkEntities } from "@/lib/linkEntities";
import Link from "next/link";

// ✅ Robust Slugify Function (Handles Case & Special Characters)
const slugify = (text: string) =>
  text
    .normalize("NFD") // Handle special characters like accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, "") // Remove special characters except dashes
    .replace(/^-+|-+$/g, ""); // Trim dashes

// ✅ Generate Static Paths for Resources at Build Time
export async function generateStaticParams() {
  const json = await getData();

  if (!json.resources) {
    throw new Error("Resources data is missing from the API response.");
  }

  return Object.keys(json.resources).map((resource) => ({
    resource: slugify(resource),
  }));
}

export default async function ResourcePage({ params }: { params: { resource: string } }) {
  // Make sure params is fully resolved before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const resource = resolvedParams.resource;
  
  if (!resource) return <p className="text-center text-gray-600">Resource not found.</p>;

  const json = await getData();
  if (!json.resources) return <p className="text-center text-gray-600">Error: No resources available.</p>;

  // ✅ Normalize and Find Resource Key (Ensure Case Insensitivity)
  const resourceKey = Object.keys(json.resources).find(
    (key) => slugify(key) === slugify(resource) // Ensure both are slugified
  );

  if (!resourceKey) return <p className="text-center text-gray-600">Resource not found.</p>;

  const resourceData = json.resources[resourceKey as keyof typeof json.resources];

  return (
    <div className="py-20 px-4 sm:px-8 max-w-4xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🌍 Resource Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-3">
           {resourceKey}
        </h1> 
      </div>

      {/* 📜 Resource Description */}
      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 text-center" dangerouslySetInnerHTML={{ __html: linkEntities(resourceData.description) }} />

      {/* 🔹 Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 🛠 Uses */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">⚒️</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Uses</h2>
            <p className="text-sm sm:text-md text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(resourceData.uses) }} />
          </div>
        </div>

        {/* ⛰️ Found In */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">⛰️</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Found In</h2>
            <p className="text-sm sm:text-md text-gray-600 mt-1">{resourceData.found_in}</p>
          </div>
        </div>

        {/* 📜 Historical Context */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">📜</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Historical Context</h2>
            <p className="text-sm sm:text-md text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(resourceData.historical_context) }} />
          </div>
        </div>

        {/* 🎭 Trivia */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🎭</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Trivia</h2>
            <p className="text-sm sm:text-md text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(resourceData.trivia) }} />
          </div>
        </div>

        {/* 🏛 Benefiting Civilizations */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🏛</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Benefiting Civs</h2>
            <ul className="list-disc mt-1 text-sm sm:text-md text-gray-600">
              {resourceData.civilizations.map((civ: string) => (
                <ul key={civ}>
                  <Link href={`/civilizations/${slugify(civ)}`} className="text-blue-600 hover:underline">
                    {civ}
                  </Link>
                </ul>
              ))}
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  );
}