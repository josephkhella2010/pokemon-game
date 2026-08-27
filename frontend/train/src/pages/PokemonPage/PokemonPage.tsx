import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store/store";
import PokemonContainer from "./childComponent/PokemonContainer";
import UsernameSection from "./childComponent/UsernameSection";
import { useEffect, useState } from "react";
import { setChosenPokemon } from "../../Store/slices/pokemon/PokemonSlice";
import { useNavigate } from "react-router-dom";

export default function PokemonPage() {
  const { pokemons, chosenPokemon } = useSelector(
    (state: RootState) => state.PokemonSlice,
  );
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => state.PokemonSlice);
  const dispatch = useDispatch();
  const [pokemonId, setPokemonId] = useState<string>("");
  const [showUsernameSection, setShowUsernameSection] =
    useState<boolean>(false);

  /* sliced Card*/
  const { currentPage } = useSelector((state: RootState) => state.PokemonSlice);
  const visibleCards = 6;
  const pokemonLength = pokemons.length;
  const Pages = Math.ceil(pokemonLength / visibleCards);
  const startCard = (currentPage - 1) * visibleCards;
  const endCard = startCard + visibleCards;
  const slicedCard = pokemons.slice(startCard, endCard);

  /* function */
  useEffect(() => {
    dispatch({
      type: "GET_ALL_POKEMONS",
    });
  }, [dispatch]);

  const getUserPokemon = () => {
    const userPokemon = pokemons.find((pok) => pok._id === pokemonId);
    console.log(userPokemon);
    return userPokemon;
  };
  const getComputerPokemon = () => {
    if (pokemons.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
  };
  const handleConfirm = () => {
    const userPokemon = getUserPokemon();
    const computerPokemon = getComputerPokemon();

    if (!userPokemon || !computerPokemon) return;

    dispatch(
      setChosenPokemon({
        username,
        userPokemon,
        computerPokemon,
      }),
    );
    setShowUsernameSection(false);
    navigate("/play");
  };

  console.log("chosenPokemon", chosenPokemon);
  return (
    <div>
      <PokemonContainer
        slicedCard={slicedCard}
        Pages={Pages}
        currentPage={currentPage}
        pokemons={pokemons}
        startCard={startCard}
        setPokemonId={setPokemonId}
        setShowUsernameSection={setShowUsernameSection}
      />
      {showUsernameSection && (
        <UsernameSection
          username={username}
          handleConfirm={handleConfirm}
          setShowUsernameSection={setShowUsernameSection}
          showUsernameSection={showUsernameSection}
        />
      )}
    </div>
  );
}
