// ui/Navbar.tsx
import Link from "next/link";
import { useSearch } from "../context/SearchContext";
import { capitalize } from "../utils/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchPokemonsBySearch } from "../lib/api";
export default function Navbar() {
  const { search, setSearch } = useSearch();
  const router = useRouter();

  const [results, setResults] = useState<{ name: string; id: number }[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch matching Pokémon on search input
  useEffect(() => {
    if (!search) return setResults([]);

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      const res = await fetchPokemonsBySearch(search);
      setResults(res);
      setLoading(false);
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleSelect = (id: number) => {
    setSearch("");
    setResults([]);
    router.push(`/pokemon/${id}`);
  };
  

  return (
    <nav className="md:bg-red-500 backdrop-blur sticky top-0 z-10">
      <div className="relative max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" passHref>
          <div className="flex  p-2  rounded-2xl   bg-red-500 items-center space-x-2 cursor-pointer ">
            <img
              src="/pkball.png"
              alt="Pokéball"
              className="w-8 h-8 animate-bounce "
            />
            <span className="text-white text-2xl font-bold">PokeWorld</span>
          </div>
        </Link>

        <div className="relative">
          <input
            type="text"
            placeholder="🔎 Search Pokemon..."
            className="w-48 sm:w-64 p-2 rounded-full bg-amber-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {results.length > 0 && (
            <ul className="absolute mt-1 w-full bg-white shadow-lg rounded z-50 max-h-60 overflow-y-auto">
              {results.slice(0, 8).map((p) => (
                <li
                  key={p.id}
                  className="cursor-pointer px-3 py-2 hover:bg-yellow-100 text-gray-800 flex items-center gap-2"
                  onClick={() => handleSelect(p.id)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                    alt={p.name}
                    className="w-6 h-6"
                  />
                  <span>{capitalize(p.name)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
