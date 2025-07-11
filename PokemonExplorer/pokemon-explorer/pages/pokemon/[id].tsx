import { GetServerSideProps } from "next";
import { fetchPokemonByIdOrName } from "../../lib/api";
import { capitalize } from "../../utils/format";
import { BarChart, Sparkles, Zap, Info, Swords, Workflow } from "lucide-react";

interface Props {
  pokemon: any;
}

export default function PokemonDetailPage({ pokemon }: Props) {
  const flavorText =
    pokemon.species?.flavor_text_entries?.find(
      (e: any) => e.language.name === "en"
    )?.flavor_text || "";

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 py-8 mb-6 lg:min-h-[400px]">
        {/* Left: Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md p-6 rounded-3xl">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-full h-auto object-contain animate-breathe transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Right: Name and Description */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center lg:text-left space-y-4">
            <h1 className="text-6xl sm:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
              {capitalize(pokemon.name)}
            </h1>
            <p className="text-gray-700 dark:text-gray-900 text-base italic leading-relaxed max-w-2xl mx-auto lg:mx-0">
              - {flavorText}
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(100px,auto)] gap-6">
        {/* Stats */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg col-span-1 lg:col-span-2 row-span-2 overflow-hidden">
          <div className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 text-xl font-bold">
            <BarChart className="w-5 h-5" />
            Stats
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              {pokemon.stats.map((s: any) => (
                <li key={s.stat.name} className="flex justify-between">
                  <span className="font-medium">{capitalize(s.stat.name)}</span>
                  <span>{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Abilities */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 text-lg font-bold">
            <Sparkles className="w-5 h-5" />
            Abilities
          </div>
          <div className="p-4">
            <ul className="list-disc list-inside space-y-1">
              {pokemon.abilities.map((a: any) => (
                <li key={a.ability.name}>{capitalize(a.ability.name)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Types */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 text-lg font-bold">
            <Zap className="w-5 h-5" />
            Types
          </div>
          <div className="p-4">
            <ul className="flex flex-wrap gap-2">
              {pokemon.types.map((t: any) => (
                <li
                  key={t.type.name}
                  className="bg-gradient-to-r from-yellow-200 to-pink-200 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {capitalize(t.type.name)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 text-lg font-bold">
            <Info className="w-5 h-5" />
            Basic Info
          </div>
          <div className="p-4 space-y-1">
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Base XP: {pokemon.base_experience}</p>
          </div>
        </div>

        {/* Evolution Chain */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md col-span-1 lg:col-span-2 overflow-hidden">
          <div className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 text-lg font-bold">
            <Workflow className="w-5 h-5" />
            Evolution Chain
          </div>
          <div className="p-4">
            {pokemon.evolution?.chain ? (
              <EvolutionChain chain={pokemon.evolution.chain} />
            ) : (
              <p>No evolution data</p>
            )}
          </div>
        </div>

        {/* Moves */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md col-span-1 lg:col-span-2 overflow-hidden max-h-64">
          <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 text-lg font-bold">
            <Swords className="w-5 h-5" />
            Moves (Top 20)
          </div>
          <div className="p-4 overflow-y-auto max-h-48">
            <ul className="list-disc list-inside grid grid-cols-2 gap-1">
              {pokemon.moves.slice(0, 20).map((m: any) => (
                <li key={m.move.name}>{capitalize(m.move.name)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function EvolutionChain({ chain }: { chain: any }) {
  const getNames = (chainNode: any): string[] => {
    const names = [chainNode.species.name];
    if (chainNode.evolves_to.length > 0) {
      return names.concat(getNames(chainNode.evolves_to[0]));
    }
    return names;
  };

  const chainList = getNames(chain);

  return (
    <div className="flex flex-wrap gap-3">
      {chainList.map((name, i) => (
        <div
          key={i}
          className="bg-yellow-100 px-4 py-1 rounded-full text-sm shadow"
        >
          {capitalize(name)}
        </div>
      ))}
    </div>
  );
}

// Server-side rendering
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  try {
    const pokemon = await fetchPokemonByIdOrName(id);
    return { props: { pokemon } };
  } catch (err) {
    return { notFound: true };
  }
};

