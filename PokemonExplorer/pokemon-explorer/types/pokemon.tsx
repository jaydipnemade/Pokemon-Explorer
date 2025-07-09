export interface PokemonBasic {
    name: string;
    id: number;
  }
  
  export interface PokemonDetail {
    name: string;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    sprites: {
      front_default: string;
    };
  }
  