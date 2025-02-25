"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getData } from "@/lib/getData"; // Fetch JSON Data
import { 
  Menu, X, Home, Shield, Users, Book, Globe, Landmark, ChevronDown, Trophy, Gem
} from "lucide-react";

// ✅ Slugify function to normalize links
const slugify = (text: string) =>
  text
    .normalize("NFD") // Normalize special characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, "-") // Convert spaces to dashes
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric characters except dashes
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing dashes

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [civilizations, setCivilizations] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [leaders, setLeaders] = useState<string[]>([]);
  const [resources, setResources] = useState<string[]>([]);
  const [wonders, setWonders] = useState<string[]>([]);
  const [victoryPaths, setVictoryPaths] = useState<string[]>([]);

  // Dropdown states
  const [isCivOpen, setIsCivOpen] = useState(false);
  const [isUnitsOpen, setIsUnitsOpen] = useState(false);
  const [isLeadersOpen, setIsLeadersOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isWondersOpen, setIsWondersOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Fetch Data on Mount
  useEffect(() => {
    getData().then((json) => {
      if (json.civilizations) setCivilizations(Object.keys(json.civilizations)); 
      if (json.units) setUnits(Object.keys(json.units)); 
      if (json.leaders) setLeaders(Object.keys(json.leaders)); 
      if (json.resources) setResources(Object.keys(json.resources));
      if (json.wonders) setWonders(Object.keys(json.wonders));
      if (json.victory_types) setVictoryPaths(Object.keys(json.victory_types));
    });
  }, []);

  const handleLinkClick = () => setIsOpen(false); // Close menu when link is clicked

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 right-4 z-50 xl:hidden bg-black text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar (Desktop & Mobile) */}
      <aside
        className={`fixed top-0 left-0 h-full w-full xl:w-64 bg-[#F5F5F5] text-gray-900 p-6 transition-transform transform shadow-md border-r border-gray-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 xl:w-56 xl:p-6 z-40`}
      >
        {/* Close Button for Screens Below 1200px */}
        <button
          className="absolute top-4 right-4 xl:hidden bg-gray-200 text-gray-900 p-2 rounded-md shadow-md"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        <h1 className="text-2xl font-semibold mb-6">Harvey Takehome</h1>
        <ul className="space-y-6 text-gray-700">
          <li className="flex items-center gap-2">
            <Home size={24} />
            <Link href="/" className="hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>Home</Link>
          </li>

          {/* Civilizations Dropdown */}
          <li className="mt-4">
            <div className="flex items-center justify-between">
              <Link href="/civilizations" className="flex items-center gap-2 hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>
                <Shield size={24} />
                Civilizations
              </Link>
              <button onClick={() => setIsCivOpen(!isCivOpen)}>
                <ChevronDown size={20} className={`transition-transform ${isCivOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isCivOpen && (
              <ul className="ml-6 mt-2 space-y-2 text-lg">
                {civilizations.map((civ) => (
                  <li key={civ}>
                    <Link href={`/civilizations/${slugify(civ)}`} className="hover:text-black" onClick={handleLinkClick}>
                      {civ}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Units Dropdown */}
          <li className="mt-4">
            <div className="flex items-center justify-between">
              <Link href="/units" className="flex items-center gap-2 hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>
                <Users size={24} />
                Units
              </Link>
              <button onClick={() => setIsUnitsOpen(!isUnitsOpen)}>
                <ChevronDown size={20} className={`transition-transform ${isUnitsOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isUnitsOpen && (
              <ul className="ml-6 mt-2 space-y-2 text-lg">
                {units.map((unit) => (
                  <li key={unit}>
                    <Link href={`/units/${slugify(unit)}`} className="hover:text-black" onClick={handleLinkClick}>
                      {unit}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Leaders Dropdown */}
          <li className="mt-4">
            <div className="flex items-center justify-between">
              <Link href="/leaders" className="flex items-center gap-2 hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>
                <Book size={24} />
                Leaders
              </Link>
              <button onClick={() => setIsLeadersOpen(!isLeadersOpen)}>
                <ChevronDown size={20} className={`transition-transform ${isLeadersOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isLeadersOpen && (
              <ul className="ml-6 mt-2 space-y-2 text-lg">
                {leaders.map((leader) => (
                  <li key={leader}>
                    <Link href={`/leaders/${slugify(leader)}`} className="hover:text-black" onClick={handleLinkClick}>
                      {leader}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Resources Dropdown */}
          <li className="mt-4">
            <div className="flex items-center justify-between">
              <Link href="/resources" className="flex items-center gap-2 hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>
                <Gem size={24} />
                Resources
              </Link>
              <button onClick={() => setIsResourcesOpen(!isResourcesOpen)}>
                <ChevronDown size={20} className={`transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isResourcesOpen && (
              <ul className="ml-6 mt-2 space-y-2 text-lg">
                {resources.map((resource) => (
                  <li key={resource}>
                    <Link href={`/resources/${slugify(resource)}`} className="hover:text-black" onClick={handleLinkClick}>
                      {resource}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Wonders Dropdown */}
          <li className="mt-4">
            <div className="flex items-center justify-between">
              <Link href="/wonders" className="flex items-center gap-2 hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>
                <Landmark size={24} />
                Wonders
              </Link>
              <button onClick={() => setIsWondersOpen(!isWondersOpen)}>
                <ChevronDown size={20} className={`transition-transform ${isWondersOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isWondersOpen && (
              <ul className="ml-6 mt-2 space-y-2 text-lg">
                {wonders.map((wonder) => (
                  <li key={wonder}>
                    <Link href={`/wonders/${slugify(wonder)}`} className="hover:text-black" onClick={handleLinkClick}>
                      {wonder}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Victory Paths Dropdown */}
          <li className="mt-4">
            <div className="flex items-center justify-between">
              <Link href="/victory" className="flex items-center gap-2 hover:text-black text-2xl xl:text-lg" onClick={handleLinkClick}>
                <Trophy size={24} />
                Victory Paths
              </Link>
              <button onClick={() => setIsVictoryOpen(!isVictoryOpen)}>
                <ChevronDown size={20} className={`transition-transform ${isVictoryOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isVictoryOpen && (
              <ul className="ml-6 mt-2 space-y-2 text-lg">
                {victoryPaths.map((path) => (
                  <li key={path}>
                    <Link href={`/victory/${slugify(path)}`} className="hover:text-black" onClick={handleLinkClick}>
                      {path}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
}