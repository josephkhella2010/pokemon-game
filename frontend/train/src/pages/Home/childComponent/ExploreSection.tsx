import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    padding: "90px 8%",
    textAlign: "center",
    background: "#f5f7ff",
  },

  title: {
    fontSize: "42px",
    color: "#20243a",
    marginBottom: "15px",
    lineHeight: "2.5rem",

    "@media (max-width: 750px)": {
      fontSize: "32px",
    },
  },

  text: {
    maxWidth: "650px",
    margin: "0 auto 50px",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#62677a",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",

    "@media (max-width: 750px)": {
      gridTemplateColumns: "1fr",
    },
  },

  card: {
    padding: "30px",
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "15px",
  },

  emoji: {
    fontSize: "50px",
    marginBottom: "15px",
  },

  cardTitle: {
    fontSize: "24px",
    color: "#20243a",
    "@media (max-width: 750px)": {
      fontSize: "18px",
    },
  },

  cardText: {
    color: "#62677a",
    lineHeight: 1.6,
  },
});

interface PokemonType {
  icon: string;
  title: string;
  text: string;
}

const pokemonTypes: PokemonType[] = [
  {
    icon: "🔥",
    title: "Fire Type",
    text: "Powerful attacks and incredible offensive abilities.",
  },
  {
    icon: "💧",
    title: "Water Type",
    text: "Flexible Pokémon with balanced battle strategies.",
  },
  {
    icon: "⚡",
    title: "Electric Type",
    text: "Fast Pokémon with powerful electric attacks.",
  },
];

export default function ExploreSection(): React.ReactElement {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Discover Pokémon</h2>

      <p className={classes.text}>
        Learn about different Pokémon types, abilities, strengths, and
        weaknesses. Find the perfect Pokémon for your battle strategy.
      </p>

      <div className={classes.cards}>
        {pokemonTypes.map((pokemon) => (
          <div className={classes.card} key={pokemon.title}>
            <div className={classes.emoji}>{pokemon.icon}</div>

            <h3 className={classes.cardTitle}>{pokemon.title}</h3>

            <p className={classes.cardText}>{pokemon.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
