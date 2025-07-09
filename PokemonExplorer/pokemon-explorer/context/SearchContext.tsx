// context/SearchContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PokemonBasic } from '../types/pokemon';
import { fetchAllPokemons } from '../lib/api';

type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
  pokemons: PokemonBasic[];
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);

  useEffect(() => {
    fetchAllPokemons().then(setPokemons);
  }, []);

  return (
    <SearchContext.Provider value={{ search, setSearch, pokemons }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
