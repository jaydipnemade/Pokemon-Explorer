import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchAllPokemons } from "../lib/api";
import { PokemonBasic } from "../types/pokemon";
import { capitalize } from "../utils/format";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [sortOption, setSortOption] = useState("id-asc");
  const { search } = useSearch();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const LIMIT = 20;

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const newPokemons = await fetchAllPokemons(offset, LIMIT);
    setPokemons((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const uniqueNew = newPokemons.filter((p) => !existingIds.has(p.id));
      return [...prev, ...uniqueNew];
    });

    setOffset((prev) => prev + LIMIT);
    setLoading(false);
    loadingRef.current = false;
  }, [offset]);

  useEffect(() => {
    loadMore(); // Initial load
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore]); // important: now it tracks the latest `loadMore`

  // Filter by search
  let filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "name-asc":
      default:
        return a.name.localeCompare(b.name);
    }
  });
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Sorting Dropdown */}
      {/* <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-2 md:bg-white/80 backdrop-blur-md px-2 py-2 rounded-4xl md:shadow-lg md:border md:border-red-300 w-fit">
          <span className="text-sm font-bold text-red-600 whitespace-nowrap">
            Sort by:
          </span>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 text-gray-800 font-semibold rounded-4xl px-2 py-2 pr-10 shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500 hover:brightness-105 transition-all duration-200"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>

            <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-red-600">
              ▼
            </div>
          </div>
        </div>
      </div> */}

      {/* Grid */}
      <main className="py-8 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filtered.map((pokemon) => (
            <Link key={pokemon.name} href={`/pokemon/${pokemon.id}`}>
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
        {/* Loader sentinel */}
        <div ref={loaderRef} className="text-center mt-8">
          {loading && (
            <span className="text-red-600 font-semibold">Loading...</span>
          )}
        </div>
      </main>
    </div>
  );
}
