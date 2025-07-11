import { PokemonBasic, PokemonDetail } from "../types/pokemon";

// 
export async function fetchAllPokemons(
  offset = 0,
  limit = 20
): Promise<PokemonBasic[]> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await res.json();

  const pokemons: PokemonBasic[] = data.results.map(
    (p: any, index: number) => ({
      name: p.name,
      id: offset + index + 1, // accurate ID
    })
  );

  return pokemons;
}
// 
export async function fetchPokemonsBySearch(
  search: string
): Promise<{ name: string; id: number }[]> {
  const TOTAL = 1302;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL}`);
  const data = await res.json();

  return data.results
    .filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()))
    .map((p: any) => {
      const match = p.url.match(/\/pokemon\/(\d+)\//);
      return {
        name: p.name,
        id: match ? parseInt(match[1]) : 0,
      };
    });
}

// 
export async function fetchPokemonByIdOrName(
  idOrName: string
): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  const data = await res.json();

  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();

  const evolutionChainUrl = speciesData.evolution_chain.url;
  const evolutionRes = await fetch(evolutionChainUrl);
  const evolutionData = await evolutionRes.json();

  return {
    ...data,
    species: speciesData,
    evolution: evolutionData,
  };
}
