import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Store/store";
import { Url } from "../../../utilities/functios";
import { createUseStyles } from "react-jss";
import PokemonCard from "./PokemonCard";
import { setClearChosenPokemon } from "../../../Store/slices/pokemon/PokemonSlice";
import { useNavigate } from "react-router-dom";

type PokemonType = keyof typeof Url;

export interface DefenseType {
  user: number;
  computer: number;
}

const useStyles = createUseStyles({
  startFightMainContainer: {
    padding: "100px 20px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "20px",
    "@media (max-width: 800px)": {
      flexDirection: "column-reverse",
    },
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "50px",
    padding: "30px",
    "@media (max-width: 750px)": {
      gridTemplateColumns: "repeat(1,1fr)",
      gap: "20px",
    },
  },
  startFightContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    backgroundColor: "#000000bd",
    width: "100%",
    height: "100dvh",
    zIndex: "1000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    postion: "relative",
  },
  startBtn: {
    width: "fit-content",
    minWidth: "220px",
    padding: "13px 28px",
    borderRadius: "999px",
    textAlign: "center",
    fontWeight: 900,
    fontSize: "16px",
    letterSpacing: "1px",
    color: "#fff",
    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
    boxShadow: "0 10px 25px rgba(108, 99, 255, 0.3)",
    textTransform: "uppercase",
    border: "0px solid transparent",
  },
  resetButton: {
    display: "block",
    padding: "13px 28px",
    border: "none",
    borderRadius: "999px",
    background: "#15182b",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    transition: "0.2s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      background: "#272b45",
    },
    "@media (max-width: 800px)": {
      fontSize: "12px",
      padding: "13px 10px",
    },
  },
});

export default function PlayPageMainSection() {
  const classes = useStyles();
  const [showStart, setShowStart] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chosenPokemon } = useSelector(
    (state: RootState) => state.PokemonSlice,
  );

  const userPokemon = chosenPokemon?.chosenPokemon.userPokemon;
  const computerPokemon = chosenPokemon?.chosenPokemon.computerPokemon;
  const userPokAttack = chosenPokemon?.chosenPokemon?.userPokemon?.attack ?? 0;

  const computerPokAttack =
    chosenPokemon?.chosenPokemon?.computerPokemon?.attack ?? 0;

  const userPokDefense =
    chosenPokemon?.chosenPokemon?.userPokemon?.defense ?? 0;

  const computerPokDefense =
    chosenPokemon?.chosenPokemon?.computerPokemon?.defense ?? 0;

  const [defense, setDefense] = useState<DefenseType>({
    user: userPokDefense,
    computer: computerPokDefense,
  });

  const [whoTurn, setWhoTurn] = useState<string>("");
  const [shake, setShake] = useState<"user" | "computer" | null>(null);

  /* function */
  useEffect(() => {
    setDefense({
      user: userPokDefense,
      computer: computerPokDefense,
    });
  }, [userPokDefense, computerPokDefense]);

  useEffect(() => {
    if (userPokAttack >= computerPokAttack) {
      setWhoTurn("user");
    } else {
      setWhoTurn("computer");
    }
  }, [userPokAttack, computerPokAttack]);
  // get url
  const getIcon = (name: string): string | undefined => {
    return Url[name.toLowerCase() as PokemonType];
  };
  useEffect(() => {
    document.body.style.overflow = showStart ? "hidden" : "auto";
    document.body.style.height = showStart ? "100dvh" : "auto";
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [showStart]);
  // get audio
  const playSound = (file: string) => {
    if (typeof window === "undefined") return;

    const audio = new Audio(`/sounds/${file}`);

    audio.volume = 1;

    audio.play().catch((error) => {
      console.error(`Could not play ${file}:`, error);
    });
  };

  const playFightSound = () => {
    playSound("fight.mp3");
  };

  const playAttackSound = () => {
    playSound("explosion.mp3");
  };

  const playVictorySound = () => {
    playSound("victory.mp3");
  };
  // handle click
  const handleClick = (title: string) => {
    if (winnerName) return;

    playAttackSound();

    if (title === "user") {
      setDefense((prev) => ({
        ...prev,
        computer: Math.max(0, prev.computer - 10),
      }));

      setWhoTurn("computer");
      setShake("user");
    }

    if (title === "computer") {
      setDefense((prev) => ({
        ...prev,
        user: Math.max(0, prev.user - 10),
      }));

      setWhoTurn("user");
      setShake("computer");
    }
  };

  ///

  // start fight
  const handleStartFight = () => {
    // 🔊 Battle start sound
    playFightSound();
    setShowStart(false);
  };

  /////
  interface BattleResult {
    winner: string;
    loser: string;
    isDraw: boolean;
  }

  const [battleResult, setBattleResult] = useState<BattleResult>({
    winner: "",
    loser: "",
    isDraw: false,
  });

  function getBattleResult(): BattleResult {
    if (defense.user <= 0 && defense.computer <= 0) {
      return {
        winner: "",
        loser: "",
        isDraw: true,
      };
    }

    if (defense.user <= 0) {
      return {
        winner: "computer",
        loser: "user",
        isDraw: false,
      };
    }

    if (defense.computer <= 0) {
      return {
        winner: "user",
        loser: "computer",
        isDraw: false,
      };
    }

    return {
      winner: "",
      loser: "",
      isDraw: false,
    };
  }

  useEffect(() => {
    setBattleResult(getBattleResult());
  }, [defense]);

  const winnerName = battleResult.winner;
  const loserName = battleResult.loser;
  const draw = battleResult.isDraw;
  //Restart the battle.

  const resetBattle = () => {
    setDefense({
      user: Math.max(0, userPokDefense),
      computer: Math.max(0, computerPokDefense),
    });
    setWhoTurn(userPokAttack >= computerPokAttack ? "user" : "computer");
    setShake(null);
    setShowStart(true);
  };

  const resetUser = () => {
    dispatch(setClearChosenPokemon());
    navigate("/");
    setShake(null);
    setShowStart(false);
  };
  useEffect(() => {
    if (winnerName || draw) {
      const timer = setTimeout(() => {
        playVictorySound();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [winnerName, draw]);
  //console.log(whoTurn);
  // click handle
  return (
    <div className={classes.startFightMainContainer}>
      <div className={classes.btnContainer}>
        {winnerName && (
          <button className={classes.resetButton} onClick={resetBattle}>
            🔄 PLAY AGAIN
          </button>
        )}
        {winnerName && (
          <button className={classes.resetButton} onClick={resetUser}>
            🔄 Choose another Pokemon
          </button>
        )}
      </div>
      {showStart && (
        <div className={classes.startFightContainer}>
          <button
            onClick={() => handleStartFight()}
            className={classes.startBtn}
          >
            {" "}
            start fight
          </button>
        </div>
      )}

      <div className={classes.cardContainer}>
        <PokemonCard
          pokemon={userPokemon}
          getIcon={getIcon}
          defense={defense.user}
          turn={chosenPokemon?.username}
          whoTurn={whoTurn}
          name="user"
          handleClick={handleClick}
          winnerName={winnerName}
          loserName={loserName}
          shake={shake}
          draw={draw}
        />
        <PokemonCard
          pokemon={computerPokemon}
          getIcon={getIcon}
          defense={defense.computer}
          turn="computer"
          whoTurn={whoTurn}
          name="computer"
          handleClick={handleClick}
          winnerName={winnerName}
          loserName={loserName}
          shake={shake}
          draw={draw}
        />
      </div>
    </div>
  );
}
