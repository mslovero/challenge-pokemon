import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemonEvolution = (pokemonName) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const pokemonResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const pokemonId = pokemonResponse.data.id;

        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        setEvolutionChain(evolutionResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonName]);

  return { evolutionChain, isLoading, error };
};
