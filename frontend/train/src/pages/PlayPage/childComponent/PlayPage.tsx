import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Store/store";
import { createUseStyles } from "react-jss";
import { Url } from "../../../utilities/functios";
import { useEffect, useState } from "react";
import { setClearChosenPokemon } from "../../../Store/slices/pokemon/PokemonSlice";

const useStyles = createUseStyles({
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
  },
  startBtn: {
    width: "fit-content",
    minWidth: "220px",
    margin: "0 auto 30px",
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
  mainContainer: {
    position: "relative",
    minHeight: "100vh",
    padding: "35px 25px 50px",
    background:
      "radial-gradient(circle at top, #ffffff 0%, #eef2ff 45%, #dfe7ff 100%)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  pageHeader: {
    textAlign: "center",
    marginBottom: "30px",

    "& h1": {
      margin: 0,
      fontSize: "36px",
      fontWeight: 900,
      color: "#15182b",
    },

    "& span": {
      color: "#6c63ff",
    },

    "@media (max-width: 600px)": {
      "& h1": {
        fontSize: "28px",
      },
    },
  },

  turnBanner: {
    width: "fit-content",
    minWidth: "220px",
    margin: "0 auto 30px",
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
  },

  resultBanner: {
    width: "fit-content",
    maxWidth: "90%",
    margin: "0 auto 25px",
    padding: "18px 35px",
    borderRadius: "20px",
    textAlign: "center",
    fontWeight: 900,
    fontSize: "26px",
    color: "#fff",
    background: "linear-gradient(135deg, #ffb703, #fb8500)",
    boxShadow: "0 12px 35px rgba(251, 133, 0, 0.35)",
    animation: "$resultPop 0.5s ease",
  },

  "@keyframes resultPop": {
    "0%": {
      transform: "scale(0.7)",
      opacity: 0,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 1,
    },
  },

  battleArea: {
    display: "grid",
    gridTemplateColumns: "1fr 100px 1fr",
    alignItems: "center",
    gap: "20px",
    maxWidth: "1250px",
    margin: "0 auto",

    "@media (max-width: 850px)": {
      gridTemplateColumns: "1fr",
      gap: "25px",
    },
  },

  cardWrapper: {
    position: "relative",
  },

  cardWrapperUser: {
    animation: "$shakeRightLeft 0.5s ease",
  },

  cardWrapperComputer: {
    animation: "$shakeLeftRight 0.5s ease",
  },

  "@keyframes shakeRightLeft": {
    "0%": {
      transform: "translateX(0)",
    },
    "20%": {
      transform: "translateX(18px)",
    },
    "40%": {
      transform: "translateX(-18px)",
    },
    "60%": {
      transform: "translateX(14px)",
    },
    "80%": {
      transform: "translateX(-10px)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },

  "@keyframes shakeLeftRight": {
    "0%": {
      transform: "translateX(0)",
    },
    "20%": {
      transform: "translateX(-18px)",
    },
    "40%": {
      transform: "translateX(18px)",
    },
    "60%": {
      transform: "translateX(-14px)",
    },
    "80%": {
      transform: "translateX(10px)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },

  playerLabel: {
    position: "absolute",
    top: "-15px",
    left: "25px",
    zIndex: 5,
    padding: "8px 18px",
    borderRadius: "999px",
    color: "#fff",
    fontWeight: 900,
    fontSize: "13px",
    letterSpacing: "1px",
    boxShadow: "0 7px 18px rgba(0,0,0,0.2)",
  },

  userLabel: {
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  },

  computerLabel: {
    background: "linear-gradient(135deg, #ef4444, #ec4899)",
  },

  statusBadge: {
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: 4,
    padding: "7px 13px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.5px",
  },

  winningBadge: {
    background: "#dcfce7",
    color: "#15803d",
  },

  losingBadge: {
    background: "#fee2e2",
    color: "#dc2626",
  },

  drawBadge: {
    background: "#fef3c7",
    color: "#b45309",
  },

  pokemonCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "30px",
    padding: "28px",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(245,247,255,0.9))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 20px 50px rgba(31, 38, 135, 0.16)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  activeCard: {
    boxShadow:
      "0 0 0 4px rgba(108,99,255,0.15), 0 25px 60px rgba(108,99,255,0.25)",
    transform: "translateY(-5px)",
  },

  deadCard: {
    opacity: 0.6,
    filter: "grayscale(0.7)",
  },

  pokemonNumber: {
    position: "absolute",
    top: "20px",
    left: "25px",
    fontSize: "12px",
    fontWeight: 800,
    color: "#9ca3af",
  },

  pokemonImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "210px",
    marginTop: "15px",
  },

  pokemonImage: {
    width: "190px",
    height: "190px",
    objectFit: "contain",
    transition: "transform 0.3s ease",
    filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.15))",
  },

  headerContainer: {
    textAlign: "center",
    marginBottom: "18px",

    "& h2": {
      margin: 0,
      fontSize: "28px",
      fontWeight: 900,
      color: "#171a2b",
      textTransform: "capitalize",
    },
  },

  typeContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "22px",
  },

  typeSection: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px 11px",
    borderRadius: "999px",
    background: "#eef2ff",
    border: "1px solid #e0e7ff",

    "& p": {
      margin: 0,
      fontSize: "12px",
      fontWeight: 800,
      textTransform: "capitalize",
      color: "#4338ca",
    },
  },

  typeIcon: {
    width: "24px",
    height: "24px",
  },

  defenseBox: {
    marginBottom: "20px",
    padding: "15px",
    borderRadius: "18px",
    background: "#f8fafc",
  },

  defenseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "9px",

    "& span:first-child": {
      fontSize: "13px",
      fontWeight: 900,
      color: "#475569",
    },

    "& span:last-child": {
      fontSize: "20px",
      fontWeight: 900,
      color: "#111827",
    },
  },

  defenseBar: {
    height: "14px",
    width: "100%",
    overflow: "hidden",
    borderRadius: "999px",
    background: "#e2e8f0",
  },

  defenseFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #22c55e, #84cc16)",
    transition: "width 0.5s ease",
  },

  defenseFillLow: {
    background: "linear-gradient(90deg, #f97316, #ef4444)",
  },

  valueContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(15,23,42,0.035)",
  },

  statRow: {
    display: "grid",
    gridTemplateColumns: "80px 1fr 40px",
    alignItems: "center",
    gap: "9px",
  },

  statName: {
    fontSize: "11px",
    fontWeight: 800,
    color: "#64748b",
  },

  statValue: {
    fontSize: "12px",
    fontWeight: 900,
    textAlign: "right",
    color: "#1e293b",
  },

  progressBarContainer: {
    width: "100%",
    height: "7px",
    borderRadius: "999px",
    overflow: "hidden",
    background: "#e2e8f0",
  },

  progressBarSection: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    transition: "width 0.5s ease",
  },

  versus: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",

    "& span": {
      fontSize: "28px",
      fontWeight: 1000,
      fontStyle: "italic",
      color: "#64748b",
    },

    "& small": {
      fontSize: "10px",
      fontWeight: 800,
      color: "#94a3b8",
    },

    "@media (max-width: 850px)": {
      flexDirection: "row",
    },
  },

  actionButton: {
    display: "block",
    width: "100%",
    margin: "0 auto 15px",
    padding: "14px 20px",
    border: "none",
    borderRadius: "16px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 900,
    letterSpacing: "0.5px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",

    "&:hover:not(:disabled)": {
      transform: "translateY(-3px)",
    },

    "&:active:not(:disabled)": {
      transform: "scale(0.97)",
    },

    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.45,
      boxShadow: "none",
    },
  },

  userButton: {
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  },

  computerButton: {
    background: "linear-gradient(135deg, #ef4444, #ec4899)",
  },

  resetButton: {
    display: "block",
    margin: "30px auto 0",
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
  },

  turnText: {
    textAlign: "center",
    marginTop: "14px",
    fontSize: "12px",
    fontWeight: 800,
    color: "#64748b",
  },
});

type PokemonType = keyof typeof Url;

interface DefenseType {
  user: number;
  computer: number;
}

type Winner = "user" | "computer" | "draw" | null;

export default function PlayPage() {
  const classes = useStyles();

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

  const [showturn, setShowTurn] = useState<"user" | "computer">("user");
  const [showStart, setShowStart] = useState<boolean>(true);

  const [winner, setWinner] = useState<Winner>(null);
  const [shake, setShake] = useState<"user" | "computer" | null>(null);

  const getIcon = (type: string): string | undefined => {
    return Url[type.toLowerCase() as PokemonType];
  };

  /* function */
  const handleStartFight = () => {
    // 🔊 Battle start sound
    playFightSound();
    setShowStart(false);
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

  //Play "YAAA!" using browser speech.

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

  useEffect(() => {
    if (!userPokemon || !computerPokemon) return;

    const firstTurn = userPokAttack >= computerPokAttack ? "user" : "computer";

    setShowTurn(firstTurn);
    setWinner(null);

    setDefense({
      user: Math.max(0, userPokDefense),
      computer: Math.max(0, computerPokDefense),
    });
  }, [userPokemon, computerPokemon]);

  useEffect(() => {
    if (!userPokemon || !computerPokemon) return;

    if (defense.user <= 0 && defense.computer <= 0) {
      setWinner("draw");
      playVictorySound();
      return;
    }

    if (defense.computer <= 0) {
      setWinner("user");
      playVictorySound();
      return;
    }

    if (defense.user <= 0) {
      setWinner("computer");
      playVictorySound();
    }
  }, [defense.user, defense.computer, userPokemon, computerPokemon]);

  const handleClick = (action: "user" | "computer") => {
    // Battle already finished
    if (winner) return;

    // Not this side's turn
    if (action !== showturn) return;

    // 💥 Attack sound
    playAttackSound();

    // Shake attacking card
    setShake(action);

    window.setTimeout(() => {
      setShake(null);
    }, 500);

    // USER ATTACKS COMPUTER
    if (action === "user") {
      const newComputerDefense = Math.max(0, defense.computer - 10);

      setDefense((prev) => ({
        ...prev,
        computer: newComputerDefense,
      }));

      // Computer is defeated.
      // Winner will be detected by the useEffect.
      if (newComputerDefense <= 0) {
        return;
      }

      // Computer's turn
      setShowTurn("computer");

      return;
    }

    // COMPUTER ATTACKS USER
    if (action === "computer") {
      const newUserDefense = Math.max(0, defense.user - 10);

      setDefense((prev) => ({
        ...prev,
        user: newUserDefense,
      }));

      // User is defeated.
      // Winner will be detected by the useEffect.
      if (newUserDefense <= 0) {
        return;
      }

      // User's turn
      setShowTurn("user");
    }
  };
  //Restart the battle.

  const resetBattle = () => {
    setDefense({
      user: Math.max(0, userPokDefense),
      computer: Math.max(0, computerPokDefense),
    });

    const firstTurn = userPokAttack >= computerPokAttack ? "user" : "computer";

    setShowTurn(firstTurn);
    setWinner(null);
    setShake(null);
    setShowStart(true);
  };

  const resetUser = () => {
    dispatch(setClearChosenPokemon());
  };

  const dispatch = useDispatch();
  //Get card status.

  const getStatus = (side: "user" | "computer") => {
    if (winner === "draw") {
      return {
        text: "DRAW",
        className: classes.drawBadge,
      };
    }

    if (winner === side) {
      return {
        text: "WINNING",
        className: classes.winningBadge,
      };
    }

    if (winner && winner !== side) {
      return {
        text: "LOSING",
        className: classes.losingBadge,
      };
    }

    const ownDefense = side === "user" ? defense.user : defense.computer;
    const opponentDefense = side === "user" ? defense.computer : defense.user;

    if (ownDefense > opponentDefense) {
      return {
        text: "WINNING",
        className: classes.winningBadge,
      };
    }

    if (ownDefense < opponentDefense) {
      return {
        text: "LOSING",
        className: classes.losingBadge,
      };
    }

    return {
      text: "DRAW",
      className: classes.drawBadge,
    };
  };

  const userStatus = getStatus("user");
  const computerStatus = getStatus("computer");

  const getCardClass = (side: "user" | "computer") => {
    const animationClass =
      shake === side
        ? side === "user"
          ? classes.cardWrapperUser
          : classes.cardWrapperComputer
        : "";

    const activeClass = showturn === side && !winner ? classes.activeCard : "";

    return `${classes.pokemonCard} ${animationClass} ${activeClass}`;
  };

  const getResultText = () => {
    if (winner === "user") {
      return `🏆 ${userPokemon?.name} WINS!`;
    }

    if (winner === "computer") {
      return `🏆 ${computerPokemon?.name} WINS!`;
    }

    if (winner === "draw") {
      return "🤝 DRAW!";
    }

    return null;
  };

  return (
    <div className={classes.mainContainer}>
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

      <div className={classes.pageHeader}>
        <h1>
          ⚔️ Pokémon <span>Battle</span>
        </h1>
      </div>

      {!winner && (
        <div className={classes.turnBanner}>
          {showturn === "user" ? "🔥 Your Turn!" : "🤖 Computer Turn!"}
        </div>
      )}

      {winner && <div className={classes.resultBanner}>{getResultText()}</div>}

      <div className={classes.battleArea}>
        {/* USER */}
        <div className={classes.cardWrapper}>
          <div className={`${classes.playerLabel} ${classes.userLabel}`}>
            👤 YOUR POKÉMON
          </div>

          <div
            className={`${getCardClass("user")} ${
              defense.user <= 0 ? classes.deadCard : ""
            }`}
          >
            {winner && (
              <div className={`${classes.statusBadge} ${userStatus.className}`}>
                {userStatus.text}
              </div>
            )}

            <div className={classes.pokemonNumber}>PLAYER</div>

            <div className={classes.pokemonImageContainer}>
              <img
                className={classes.pokemonImage}
                src={userPokemon?.img}
                alt={userPokemon?.name}
              />
            </div>

            <div className={classes.headerContainer}>
              <h2>{userPokemon?.name}</h2>
            </div>

            <div className={classes.typeContainer}>
              {userPokemon?.type?.map((type) => {
                const icon = getIcon(type);

                return (
                  <div key={type} className={classes.typeSection}>
                    {icon && (
                      <img className={classes.typeIcon} src={icon} alt={type} />
                    )}

                    <p>{type}</p>
                  </div>
                );
              })}
            </div>

            <div className={classes.defenseBox}>
              <div className={classes.defenseHeader}>
                <span>🛡️ DEFENSE</span>
                <span>{defense.user}</span>
              </div>

              <div className={classes.defenseBar}>
                <div
                  className={`${classes.defenseFill} ${
                    defense.user <= 30 ? classes.defenseFillLow : ""
                  }`}
                  style={{
                    width: `${Math.max(0, Math.min(100, defense.user))}%`,
                  }}
                />
              </div>
            </div>

            <div className={classes.valueContainer}>
              <Stat
                name="Attack"
                value={userPokemon?.attack ?? 0}
                classes={classes}
              />

              <Stat name="Defense" value={defense.user} classes={classes} />

              <Stat
                name="Sp. Attack"
                value={userPokemon?.specialAttack ?? 0}
                classes={classes}
              />

              <Stat
                name="Sp. Defense"
                value={userPokemon?.specialDefense ?? 0}
                classes={classes}
              />

              <Stat
                name="Speed"
                value={userPokemon?.speed ?? 0}
                classes={classes}
              />
            </div>
          </div>

          <button
            className={`${classes.actionButton} ${classes.userButton}`}
            disabled={showturn !== "user" || !!winner}
            onClick={() => handleClick("user")}
          >
            ⚡ ATTACK!
          </button>

          <div className={classes.turnText}>
            {showturn === "user" && !winner
              ? "👉 Click to attack!"
              : "Wait for your turn..."}
          </div>
        </div>

        {/* VS */}
        <div className={classes.versus}>
          <span>VS</span>
          <small>⚔️</small>
        </div>

        {/* COMPUTER */}
        <div className={classes.cardWrapper}>
          <div className={`${classes.playerLabel} ${classes.computerLabel}`}>
            🤖 COMPUTER
          </div>

          <div
            className={`${getCardClass("computer")} ${
              defense.computer <= 0 ? classes.deadCard : ""
            }`}
          >
            {winner && (
              <div
                className={`${classes.statusBadge} ${computerStatus.className}`}
              >
                {computerStatus.text}
              </div>
            )}

            <div className={classes.pokemonNumber}>CPU</div>

            <div className={classes.pokemonImageContainer}>
              <img
                className={classes.pokemonImage}
                src={computerPokemon?.img}
                alt={computerPokemon?.name}
              />
            </div>

            <div className={classes.headerContainer}>
              <h2>{computerPokemon?.name}</h2>
            </div>

            <div className={classes.typeContainer}>
              {computerPokemon?.type?.map((type) => {
                const icon = getIcon(type);

                return (
                  <div key={type} className={classes.typeSection}>
                    {icon && (
                      <img className={classes.typeIcon} src={icon} alt={type} />
                    )}

                    <p>{type}</p>
                  </div>
                );
              })}
            </div>

            <div className={classes.defenseBox}>
              <div className={classes.defenseHeader}>
                <span>🛡️ DEFENSE</span>
                <span>{defense.computer}</span>
              </div>

              <div className={classes.defenseBar}>
                <div
                  className={`${classes.defenseFill} ${
                    defense.computer <= 30 ? classes.defenseFillLow : ""
                  }`}
                  style={{
                    width: `${Math.max(0, Math.min(100, defense.computer))}%`,
                  }}
                />
              </div>
            </div>

            <div className={classes.valueContainer}>
              <Stat
                name="Attack"
                value={computerPokemon?.attack ?? 0}
                classes={classes}
              />

              <Stat name="Defense" value={defense.computer} classes={classes} />

              <Stat
                name="Sp. Attack"
                value={computerPokemon?.specialAttack ?? 0}
                classes={classes}
              />

              <Stat
                name="Sp. Defense"
                value={computerPokemon?.specialDefense ?? 0}
                classes={classes}
              />

              <Stat
                name="Speed"
                value={computerPokemon?.speed ?? 0}
                classes={classes}
              />
            </div>
          </div>

          <button
            className={`${classes.actionButton} ${classes.computerButton}`}
            disabled={showturn !== "computer" || !!winner}
            onClick={() => handleClick("computer")}
          >
            🤖 ATTACK!
          </button>

          <div className={classes.turnText}>
            {showturn === "computer" && !winner
              ? "👉 Computer attacks!"
              : "Wait for computer turn..."}
          </div>
        </div>
      </div>

      {winner && (
        <button className={classes.resetButton} onClick={resetBattle}>
          🔄 PLAY AGAIN
        </button>
      )}
      {winner && (
        <button className={classes.resetButton} onClick={resetUser}>
          🔄 Choose another Pokemon
        </button>
      )}
    </div>
  );
}

/*
 * Reusable stat component.
 */
function Stat({
  name,
  value,
  classes,
}: {
  name: string;
  value: number;
  classes: Record<string, string>;
}) {
  return (
    <div className={classes.statRow}>
      <span className={classes.statName}>{name}</span>

      <div className={classes.progressBarContainer}>
        <div
          className={classes.progressBarSection}
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
          }}
        />
      </div>

      <span className={classes.statValue}>{Math.max(0, value)}</span>
    </div>
  );
}
