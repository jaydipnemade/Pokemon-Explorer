import { PokemonBasic, PokemonDetail } from "../types/pokemon";

export async function fetchAllPokemons(): Promise<PokemonBasic[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const pokemons: PokemonBasic[] = data.results.map(
    (p: any, index: number) => ({
      name: p.name,
      id: index + 1,
    })
  );

  // Sort alphabetically by name
  return pokemons.sort((a, b) => a.name.localeCompare(b.name));
}

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
