import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    minHeight: "500px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "60px",
    padding: "80px 8%",
    background: "#ffffff",

    "@media (max-width: 750px)": {
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
  },

  content: {
    order: 1,

    "@media (max-width: 750px)": {
      order: 2,
    },
  },

  imageContainer: {
    order: 2,

    "@media (max-width: 750px)": {
      order: 1,
    },
  },

  image: {
    width: "100%",
    //maxWidth: "550px",
    borderRadius: "24px",
    display: "block",
  },

  title: {
    fontSize: "42px",
    color: "#20243a",
    marginBottom: "20px",
    lineHeight: "3rem",

    "@media (max-width: 750px)": {
      fontSize: "20px",
      justifySelf: "center",
      textAlign: "center",
      lineHeight: "2rem",
    },
  },

  text: {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#62677a",
    "@media (max-width: 750px)": {
      textAlign: "center",
    },
  },
});

export default function TeamSection(): React.ReactElement {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <div className={classes.content}>
        <h2 className={classes.title}>Build Your Dream Team</h2>

        <p className={classes.text}>
          Choose your favorite Pokémon and create a powerful team. Combine
          different types, abilities, and strategies to become unstoppable.
        </p>
      </div>

      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src="/foto/pokemonTeams.jpg"
          alt="Pokemon team"
        />
      </div>
    </section>
  );
}
