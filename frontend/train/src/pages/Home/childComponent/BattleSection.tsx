import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  section: {
    minHeight: "500px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "60px",
    padding: "80px 8%",
    background: "#f5f7ff",

    "@media (max-width: 750px)": {
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
  },

  image: {
    width: "100%",
    //maxWidth: "550px",
    borderRadius: "24px",
    display: "block",
  },

  content: {
    //maxWidth: "550px",

    "@media (max-width: 750px)": {
      textAlign: "center",
    },
  },

  title: {
    fontSize: "42px",
    marginBottom: "20px",
    color: "#20243a",
    lineHeight: "3rem",

    "@media (max-width: 750px)": {
      fontSize: "20px",
      textAlign: "center",
      lineHeight: "2rem",
    },
  },

  text: {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#62677a",
    marginBottom: "30px",
    "@media (max-width: 750px)": {
      textAlign: "center",
    },
  },

  button: {
    border: "none",
    padding: "14px 28px",
    borderRadius: "30px",
    background: "#ffcc00",
    color: "#222",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    "@media (max-width: 750px)": {
      textAlign: "center",
      justifySelf: "center",
    },
  },
});

export default function BattleSection(): React.ReactElement {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <section className={classes.section}>
      <div>
        <img
          className={classes.image}
          src="/foto/pokemonBattle.jpg"
          alt="Pokemon battle"
        />
      </div>

      <div className={classes.content}>
        <h2 className={classes.title}>Enter the Battle Arena</h2>

        <p className={classes.text}>
          Challenge powerful trainers, choose your strategy, and fight your way
          to victory. Every battle is a chance to become stronger.
        </p>

        <button className={classes.button} onClick={() => navigate("/pokemon")}>
          Start Battle
        </button>
      </div>
    </section>
  );
}
