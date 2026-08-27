import { all } from "redux-saga/effects";
import watchGetAllPokemonSaga from "./FetchGetAllPokemonSaga";

function* rootSaga(): Generator {
  yield all([watchGetAllPokemonSaga()]);
}

export default rootSaga;
