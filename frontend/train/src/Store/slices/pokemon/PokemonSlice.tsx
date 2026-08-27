import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PokemonItemsType } from "../../../utilities/interfaces";

const storageCurrentPage = localStorage.getItem("currentPage");
const parsedCurrentPage = storageCurrentPage ? Number(storageCurrentPage) : 1;

const storageUserPokemon = localStorage.getItem("userPokemon");
const parsedStorageUserPokemon = storageUserPokemon
  ? JSON.parse(storageUserPokemon)
  : null;

interface ChosenPokemonType {
  userPokemon: PokemonItemsType | null;
  computerPokemon: PokemonItemsType | null;
}

interface UserPokemonType {
  username: string;
  chosenPokemon: ChosenPokemonType;
}
interface initialStateType {
  pokemons: PokemonItemsType[];
  currentPage: number;
  chosenPokemon: null | UserPokemonType;
  username: string;
}

const initialState: initialStateType = {
  pokemons: [],
  currentPage: parsedCurrentPage,
  chosenPokemon: parsedStorageUserPokemon,
  username: "",
};

const PokemonSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<PokemonItemsType[]>) => {
      state.pokemons = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      localStorage.setItem("currentPage", String(action.payload));
    },
    setChosenPokemon: (
      state,
      action: PayloadAction<{
        username: string;
        userPokemon: PokemonItemsType;
        computerPokemon: PokemonItemsType;
      }>,
    ) => {
      const { username, userPokemon, computerPokemon } = action.payload;

      const data = {
        username,
        chosenPokemon: {
          userPokemon,
          computerPokemon,
        },
      };

      state.chosenPokemon = data;

      localStorage.setItem("userPokemon", JSON.stringify(data));
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setClearChosenPokemon: (state) => {
      localStorage.removeItem("userPokemon");
      if (state.chosenPokemon) {
        state.chosenPokemon.username = "";
        state.chosenPokemon.chosenPokemon.userPokemon = null;
        state.chosenPokemon.chosenPokemon.computerPokemon = null;
      }

      state.username = "";
    },
  },
});

export const { setPokemons, setCurrentPage, setChosenPokemon, setUsername,setClearChosenPokemon } =
  PokemonSlice.actions;

export default PokemonSlice.reducer;
