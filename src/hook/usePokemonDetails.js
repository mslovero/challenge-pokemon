import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemonDetails = (pokemonUrl) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(pokemonUrl);
        setDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonUrl]);

  return { details, loading, error };
};
