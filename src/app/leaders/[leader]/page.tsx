import { getData } from "../../../lib/getData";
import { linkEntities } from "../../../lib/linkEntities"; // Import linking function
import Link from "next/link";

// ✅ Generate Static Params for SSG
export async function generateStaticParams() {
  const json = await getData();
  return Object.keys(json.leaders).map((leader) => ({
    leader: encodeURIComponent(leader.replace(/\s+/g, "-")), // ✅ Normalize spaces to dashes
  }));
}

export default async function LeaderPage({ params }: { params: { leader: string } }) {
  // ✅ Ensure params is fully resolved before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const leader = resolvedParams.leader;
  
  if (!leader) return <p className="text-center text-gray-600">Leader not found.</p>;

  const json = await getData();
  const normalizedLeader = decodeURIComponent(leader).replace(/-/g, " ").trim().toLowerCase();

  const leaderKey = Object.keys(json.leaders).find(
    (key) => key.toLowerCase().trim() === normalizedLeader
  );

  if (!leaderKey) return <p className="text-center text-gray-600">Leader not found.</p>;

  const leaderData = json.leaders[leaderKey as keyof typeof json.leaders];

  // Apply entity linking
  const leaderDescription = linkEntities(leaderData.description);

  return (
    <div className="py-10 px-4 sm:px-8 max-w-5xl mx-auto text-[#222] bg-white font-sans leading-relaxed">
      
      {/* 🏛 Leader Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-2 sm:gap-3">
           {leaderKey}
        </h1>
      </div>

      {/* 📜 Leader Description */}
      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12 text-center" dangerouslySetInnerHTML={{ __html: leaderDescription }} />

      {/* 🔹 Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* 🌍 Civilization */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">🌍</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Civilization</h2>
            <p className="text-sm sm:text-lg">
              <Link href={`/civilizations/${encodeURIComponent(leaderData.civilization.toLowerCase())}`} className="text-blue-600 hover:underline">
                {leaderData.civilization}
              </Link>
            </p>
          </div>
        </div>

        {/* ⚡ Leader Abilities */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4">
          <span className="text-3xl sm:text-4xl">⚡</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Unique Abilities</h2>
            <ul className="list-disc text-sm sm:text-lg text-gray-700">
              {leaderData.abilities.map((ability: string) => (
                <li key={ability} className="mt-1">{ability}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 📖 Leadership Tendencies */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 md:col-span-2">
          <span className="text-3xl sm:text-4xl">📖</span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Leadership Tendencies</h2>
            <p className="text-sm sm:text-lg text-gray-700">{leaderData.tendency}</p>
          </div>
        </div>

      </div>
    </div>
  );
}