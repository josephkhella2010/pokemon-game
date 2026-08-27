import { call, put, takeLatest } from "redux-saga/effects";
import { setClearLoading, setError, setLoading } from "../slices/LoadingSlice";
import { setPokemons } from "../slices/pokemon/PokemonSlice";
import { ApiUrl } from "../../utilities/functios";
import type { PokemonItemsType } from "../../utilities/interfaces";

interface PokemonResponse {
  pokemons: PokemonItemsType[];
}

const getApiUrl = () => {
  return ApiUrl({
    method: "GET",
    endpoint: "/pokemons",
  });
};
function* getAllPokemonSaga(): Generator {
  try {
    yield put(setLoading());

    const { pokemons } = (yield call(getApiUrl)) as PokemonResponse;

    yield put(setPokemons(pokemons));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    yield put(setError(message));
  } finally {
    yield put(setClearLoading());
  }
}

function* watchGetAllPokemonSaga(): Generator {
  yield takeLatest("GET_ALL_POKEMONS", getAllPokemonSaga);
}

export default watchGetAllPokemonSaga;
