import { getData } from "@/lib/getData";
import Link from "next/link";

// ✅ Define `VictoryType`
interface VictoryType {
    icon: string;
    description: string;
    best_civilizations: string[];
}

// ✅ Fetch and properly type victory types
export default async function VictoryListPage() {
    const json = await getData();
    
    const victoryTypes: Record<string, VictoryType> = json.victory_types;

    return (
        <div className="py-16 px-4 sm:px-8 max-w-6xl mx-auto text-[#222] bg-white font-sans leading-relaxed">

            {/* 🏆 Page Title */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-8 sm:mb-10 text-gray-900 text-center flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl">🏆</span> Victory Paths
            </h1>
            <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12">
                Choose your path to victory and lead your civilization to greatness.
            </p>

            {/* 🏅 Victory Paths Grid */}
            {Object.keys(victoryTypes).length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No victory types available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {Object.entries(victoryTypes).map(([name, data]) => (
                        <Link key={name} href={`/victory/${encodeURIComponent(name.toLowerCase())}`} className="group">
                            <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-300 flex items-start gap-4 hover:shadow-lg transition-transform transform hover:scale-105 min-h-full">
                                <span className="text-5xl sm:text-4xl opacity-80">{data.icon}</span>
                                {/* 🎖 Victory Title & Icon */}
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition" style={{ fontFamily: "Sora, sans-serif" }}>
                                        {name} Victory
                                    </h2>
                                    {/* 📖 Victory Description */}
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
