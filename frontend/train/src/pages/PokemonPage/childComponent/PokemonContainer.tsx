import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import PaginationSection from "./PaginationSection";
import type { PokemonItemsType } from "../../../utilities/interfaces";
import { Url } from "../../../utilities/functios";

const useStyles = createUseStyles({
  pokemonCardMainContainer: {
    position: "relative",
    paddingBottom: "100px",
    padding: "0px 30px",
    minHeight: "100dvh",
    "@media (max-width: 600px)": {
      paddingRigth: "20px",
      paddingLeft: "20px",
    },
  },
  title: {
    height: "150px",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  PageNumber: {
    fontWeight: "700",
    fontSize: "24px",
    "@media (max-width: 600px)": {
      fontSize: "16px",
    },
  },
  pokemonCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    margin: "30px 0px 40px 0px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
      margin: "30px 0px 40px 0px",
    },

    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      margin: "30px 0px 40px 0px",
    },
  },

  pokemonCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "24px",
    padding: "24px",
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
    transition: "all 0.3s ease",
    cursor: "pointer",

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 18px 40px rgba(0, 0, 0, 0.18)",
    },
  },

  pokemonNumber: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#888",
    marginBottom: "5px",
  },

  pokemonImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "180px",
  },

  pokemonImage: {
    width: "170px",
    height: "170px",
    objectFit: "contain",
    transition: "transform 0.3s ease",

    "$pokemonCard:hover &": {
      transform: "scale(1.08)",
    },
  },

  headerContainer: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",

    "& h2": {
      margin: 0,
      fontSize: "22px",
      fontWeight: 700,
      color: "#222",
      textTransform: "capitalize",
    },
  },

  typeContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "25px",
  },

  typeSection: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "12px",
    background: "rgba(0, 0, 0, 0.06)",

    "& p": {
      margin: 0,
      fontSize: "13px",
      fontWeight: 600,
      textTransform: "capitalize",
    },
  },

  typeIcon: {
    width: "30px",
    height: "30px",
  },

  valueContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(0, 0, 0, 0.04)",
  },

  statRow: {
    display: "grid",
    gridTemplateColumns: "70px 1fr 35px",
    alignItems: "center",
    gap: "10px",
  },

  statName: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#555",
    width: "fit-content",
  },

  statValue: {
    fontSize: "12px",
    fontWeight: 700,
    textAlign: "right",
    color: "#333",
  },

  progressBarContainer: {
    width: "100%",
    height: "8px",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#ddd",
    border: "none",
  },

  progressBarSection: {
    height: "100%",
    width: "0%",
    borderRadius: "20px",
    background: "linear-gradient(90deg, #ff9a3c, #ff5f6d)",
    transition: "width 0.6s ease",
  },
});
type PokemonType = keyof typeof Url;

interface PokemonStats {
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

interface PropsType {
  slicedCard: PokemonItemsType[];
  Pages: number;
  currentPage: number;
  pokemons: PokemonItemsType[];
  startCard: number;
  setPokemonId: (id: string) => void;
  setShowUsernameSection: (showUsernameSection: boolean) => void;
}

export default function PokemonContainer({
  slicedCard,
  Pages,
  currentPage,
  pokemons,
  startCard,
  setPokemonId,
  setShowUsernameSection,
}: PropsType) {
  const classes = useStyles();
  const [val, setVal] = useState<PokemonStats[]>([]);
  //const dispatch = useDispatch();
  const [visiblePagination, setVisiblePagination] = useState<number>(4);

  //console.log("pokemons", pokemons);

  /* pagination  */
  const startPage = Math.max(
    1,
    currentPage - Math.floor(visiblePagination / 2),
  );
  const endPage = Math.min(Pages, startPage + visiblePagination - 1);
  const numberOfPages = endPage - startPage + 1;

  const pageNumbers = Array.from(
    { length: numberOfPages },
    (_, index) => startPage + index,
  );

  /*  */

  useEffect(() => {
    if (pokemons.length === 0) return;

    // Start all bars at 0
    setVal(
      pokemons.map(() => ({
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      })),
    );

    const timer = setTimeout(() => {
      setVal(
        pokemons.map((pok) => ({
          attack: pok.attack,
          defense: pok.defense,
          specialAttack: pok.specialAttack,
          specialDefense: pok.specialDefense,
          speed: pok.speed,
        })),
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [pokemons]);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth > 700
        ? setVisiblePagination(4)
        : setVisiblePagination(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [visiblePagination]);

  const getIcon = (type: string): string | undefined => {
    return Url[type.toLowerCase() as PokemonType];
  };

  //console.log("val", val[1]);

  return (
    <div className={classes.pokemonCardMainContainer}>
      <div className={classes.title}>
        <h2> Choose Your Pokémon</h2>
      </div>
      <p className={classes.PageNumber}>Page {currentPage}</p>
      <div className={classes.pokemonCardContainer}>
        {slicedCard.length > 0 ? (
          slicedCard.map((pok, index) => {
            return (
              <div
                key={index}
                className={classes.pokemonCard}
                onClick={() => {
                  setPokemonId(pok?._id);
                  setShowUsernameSection(true);
                }}
              >
                <div className={classes.pokemonNumber}>
                  #{String(index + startCard + 1)}
                </div>

                <div className={classes.pokemonImageContainer}>
                  <img
                    className={classes.pokemonImage}
                    src={pok.img}
                    alt={pok.name}
                  />
                </div>

                <div className={classes.headerContainer}>
                  <h2>{pok.name}</h2>
                </div>

                <div className={classes.typeContainer}>
                  {pok.type?.map((type) => {
                    const icon = getIcon(type);

                    return (
                      <div key={type} className={classes.typeSection}>
                        {icon && (
                          <img
                            className={classes.typeIcon}
                            src={icon}
                            alt={type}
                          />
                        )}

                        <p>{type}</p>
                      </div>
                    );
                  })}
                </div>

                <div className={classes.valueContainer}>
                  <div className={classes.statRow}>
                    <span className={classes.statName}>Attack</span>

                    <div className={classes.progressBarContainer}>
                      <div
                        className={classes.progressBarSection}
                        style={{
                          width: `${val[index]?.attack ?? 0}%`,
                        }}
                      />
                    </div>

                    <span className={classes.statValue}>{pok.attack}</span>
                  </div>

                  <div className={classes.statRow}>
                    <span className={classes.statName}>Defense</span>

                    <div className={classes.progressBarContainer}>
                      <div
                        className={classes.progressBarSection}
                        style={{
                          width: `${val[index]?.defense ?? 0}%`,
                        }}
                      />
                    </div>

                    <span className={classes.statValue}>{pok.defense}</span>
                  </div>

                  <div className={classes.statRow}>
                    <span className={classes.statName}>Sp. Attack</span>

                    <div className={classes.progressBarContainer}>
                      <div
                        className={classes.progressBarSection}
                        style={{
                          width: `${val[index]?.specialAttack ?? 0}%`,
                        }}
                      />
                    </div>

                    <span className={classes.statValue}>
                      {pok.specialAttack}
                    </span>
                  </div>

                  <div className={classes.statRow}>
                    <span className={classes.statName}>Sp. Defense</span>

                    <div className={classes.progressBarContainer}>
                      <div
                        className={classes.progressBarSection}
                        style={{
                          width: `${val[index]?.specialDefense ?? 0}%`,
                        }}
                      />
                    </div>

                    <span className={classes.statValue}>
                      {pok.specialDefense}
                    </span>
                  </div>

                  <div className={classes.statRow}>
                    <span className={classes.statName}>Speed</span>

                    <div className={classes.progressBarContainer}>
                      <div
                        className={classes.progressBarSection}
                        style={{
                          width: `${val[index]?.speed ?? 0}%`,
                        }}
                      />
                    </div>

                    <span className={classes.statValue}>{pok.speed}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No Pokemon Show</h2>
          </div>
        )}
      </div>
      <PaginationSection
        currentPage={currentPage}
        totalPages={Pages}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}
