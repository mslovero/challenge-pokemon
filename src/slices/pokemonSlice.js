import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPokemons = async () => {
  let allPokemons = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const { results } = response.data;

    if (results.length === 0) break;

    allPokemons = [...allPokemons, ...results];
    offset += limit;
  }

  return allPokemons;
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({ page = 1, limit = 10, filter = "" }) => {
    let pokemons;
    let total;

    if (filter) {
      const allPokemons = await fetchAllPokemons();
      pokemons = allPokemons.filter((pokemon) => pokemon.name.includes(filter));
      total = pokemons.length;
    } else {
      const offset = (page - 1) * limit;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const { results, count } = response.data;
      pokemons = results;
      total = count;
    }

    return { pokemons, total };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    status: "idle",
    page: 1,
    limit: 10,
    total: 0,
    filter: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.list = action.payload;

        state.total = action.payload.count;
        state.status = "succeeded";
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setPage, setLimit, setFilter } = pokemonSlice.actions;
export default pokemonSlice.reducer;
