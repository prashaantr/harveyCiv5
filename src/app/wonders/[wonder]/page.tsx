import { getData } from "../../../lib/getData";
import { linkEntities } from "../../../lib/linkEntities";
import Link from "next/link";

// ✅ Generate Static Params for SSG
export async function generateStaticParams() {
  const json = await getData();
  return Object.keys(json.wonders).map((wonder) => ({
    wonder: encodeURIComponent(wonder.replace(/\s+/g, "-").toLowerCase()),
  }));
}

// ✅ Improved Slugify Function (Ensures Consistency)
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes

export default async function WonderPage({ params }: { params: { wonder: string } }) {
  // ✅ Ensure params is fully resolved before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const wonder = resolvedParams.wonder;
  
  if (!wonder) return <p className="text-center text-gray-600">Wonder not found.</p>;

  const json = await getData();
  const normalizedWonder = decodeURIComponent(wonder).replace(/-/g, " ").trim().toLowerCase();

  // ✅ Normalize Wonder Names (Case-Insensitive Matching)
  const wonderKey = Object.keys(json.wonders).find(
    (key) => key.toLowerCase().trim() === normalizedWonder
  );

  if (!wonderKey) return <p className="text-center text-gray-600">Wonder not found.</p>;

  const wonderData = json.wonders[wonderKey as keyof typeof json.wonders];

  return (
    <div className="py-10 px-4 sm:px-8 max-w-4xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🏛️ Wonder Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-2 sm:gap-3">
          <span>{wonderKey}</span>
        </h1>
        <p className="text-base sm:text-2xl text-gray-700 mt-4 sm:mt-8" dangerouslySetInnerHTML={{ __html: linkEntities(wonderData.description) }} />
      </div>

      {/* 🔹 Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 🏰 Civilization */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🏰</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Civilization</h2>
            <p className="text-md text-gray-600 mt-1">
              <Link href={`/civilizations/${slugify(wonderData.civilization)}`} className="text-blue-600 hover:underline">
                {wonderData.civilization}
              </Link>
            </p>
          </div>
        </div>

        {/* 🌟 Benefits */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🌟</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Benefits</h2>
            <p className="text-md text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(wonderData.benefits) }} />
          </div>
        </div>

        {/* 📜 Historical Context */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">📜</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Historical Context</h2>
            <p className="text-md text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(wonderData.historical_context) }} />
          </div>
        </div>

        {/* 🎭 Trivia */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🎭</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Trivia</h2>
            <p className="text-md text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: linkEntities(wonderData.trivia) }} />
          </div>
        </div>
      </div>
    </div>
  );
}