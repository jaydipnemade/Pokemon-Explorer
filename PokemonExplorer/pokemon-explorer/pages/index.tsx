import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllPokemons } from "../lib/api";
import { PokemonBasic } from "../types/pokemon";
import { capitalize } from "../utils/format";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [sortOption, setSortOption] = useState("id-asc");
  const { search } = useSearch();

  useEffect(() => {
    fetchAllPokemons().then(setPokemons);
  }, []);

  // Apply filtering
  let filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "id-desc":
        return b.id - a.id;
      case "id-asc":
      default:
        return a.id - b.id;
    }
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Sorting Dropdown */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-red-300 w-fit">
          <span className="text-sm font-bold text-red-600 whitespace-nowrap">
            Sort by:
          </span>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 text-gray-800 font-semibold rounded-lg px-4 py-2 pr-10 shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500 hover:brightness-105 transition-all duration-200"
            >
              <option value="id-asc">ID ↑</option>
              <option value="id-desc">ID ↓</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>

            {/* Custom arrow */}
            <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-red-600">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="py-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filtered.map((pokemon) => (
            <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
              <div className="relative transition transform hover:scale-105">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-40 h-40 object-contain mx-auto mt-4 transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4 text-center">
                  <h3 className="capitalize text-lg font-semibold text-gray-800">
                    {capitalize(pokemon.name)}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-red-500 to-purple-600" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
