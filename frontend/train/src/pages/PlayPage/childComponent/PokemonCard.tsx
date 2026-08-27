import { createUseStyles } from "react-jss";
import type { PokemonItemsType } from "../../../utilities/interfaces";

const useStyles = createUseStyles({
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
    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",

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
  cardContainer: {
    background: "#aa3bff2b",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    padding: "30px",
    border: "1px solid rgba(190, 180, 255, 0.25)",
    borderRadius: "20px",

    boxShadow: `
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 0 35px rgba(108, 99, 255, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.12)
  `,
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
    "& p": {
      "@media (max-width: 800px)": {
        fontSize: "11px",
      },
    },
  },
  statusSection: {
    padding: "12px",
    border: "1px solid black",
    width: "fit-content",
    borderRadius: "15px",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  img: {
    width: "80%",
    height: "200px",
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
    background: "linear-gradient(90deg, #ff9a3c, #ff5f6d)",
    transition: "width 0.5s ease",
  },
  winner: {
    backgroundColor: "#01b26c4d",
  },
  loser: {
    backgroundColor: "#e200004d",
  },
  winningSection: {
    backgroundColor: "#158c54",
    color: "white",
  },
  losingSection: {
    backgroundColor: "#b64c4c",
    color: "white",
  },
  shakeCard: {
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
  drawSection: {
    backgroundColor: "#d89b00",
    color: "white",
  },
  draw: {
    backgroundColor: "#89660f",
  },
  pokemonName: {
    padding: "15px",
    textAlign: "center",
    width: "100%",
    fontWeight: "700",
    fontSize: "25px",
  },
});

interface PropsType {
  pokemon: PokemonItemsType | null | undefined;
  getIcon: (name: string) => string | undefined;
  defense: number;
  turn: string | undefined;
  whoTurn: string;
  name: string;
  handleClick: (title: string) => void;
  winnerName: string;
  loserName: string;
  shake: "user" | "computer" | null;
  draw: boolean;
}
export default function PokemonCard({
  pokemon,
  getIcon,
  defense,
  turn,
  whoTurn,
  name,
  handleClick,
  winnerName,
  loserName,
  shake,
  draw,
}: PropsType) {
  const classes = useStyles();
  if (!pokemon) {
    return null;
  }
  return (
    <div>
      <button
        className={`${classes.actionButton}
      
      `}
        disabled={whoTurn !== name || !!winnerName}
        onClick={() => {
          handleClick(name);
        }}
      >
        Attack
      </button>

      <div
        className={`${classes.cardContainer} ${
          winnerName === name
            ? classes.winner
            : loserName === name
              ? classes.loser
              : draw
                ? classes.draw
                : ""
        } ${shake === name ? classes.shakeCard : ""}`}
      >
        <div>
          <div className={classes.turnBanner}>
            {turn === "computer" ? (
              <p> 🤖 {turn} turn </p>
            ) : (
              <p> 🔥 {turn} Turn</p>
            )}
          </div>
          {(winnerName || draw) && (
            <div
              className={`${classes.statusSection} ${
                winnerName === name
                  ? classes.winningSection
                  : draw
                    ? classes.drawSection
                    : classes.losingSection
              }`}
            >
              <p>
                {" "}
                {draw ? "Draw" : winnerName === name ? "Winning" : "Losing"}
              </p>
            </div>
          )}
        </div>

        <div className={classes.imgContainer}>
          <img src={pokemon.img} alt={pokemon.name} className={classes.img} />
        </div>
        <p className={classes.pokemonName}>{pokemon.name}</p>
        <div className={classes.typeContainer}>
          {pokemon?.type?.map((type) => {
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
        <div className={classes.valueContainer}>
          <Stat name="Attack" value={pokemon?.attack ?? 0} classes={classes} />

          <Stat name="Defense" value={defense} classes={classes} />

          <Stat
            name="Sp. Attack"
            value={pokemon?.specialAttack ?? 0}
            classes={classes}
          />

          <Stat
            name="Sp. Defense"
            value={pokemon?.specialDefense ?? 0}
            classes={classes}
          />

          <Stat name="Speed" value={pokemon?.speed ?? 0} classes={classes} />
        </div>
      </div>
    </div>
  );
}

interface StatProps {
  name: string;
  value: number;
  classes: Record<string, string>;
}
function Stat({ name, value, classes }: StatProps) {
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
