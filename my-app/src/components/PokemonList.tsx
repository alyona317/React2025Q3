import type { NamedAPIResource } from "../types/pokemon";

export const PokemonList: React.FC<{ pokemons: NamedAPIResource[] }> = ({pokemons})=>{
return (
  <ul>
    {pokemons.map((p) => (
      <li key={p.name}>{p.name}</li>
    ))}
  </ul>
);
}