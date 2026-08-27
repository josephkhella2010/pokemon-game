import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  section: {
    padding: "100px 8%",
    textAlign: "center",
    background: "#ffcc00",
  },

  title: {
    fontSize: "48px",
    color: "#20243a",
    marginBottom: "20px",
    lineHeight: "2.5rem",

    "@media (max-width: 750px)": {
      fontSize: "24px",
      lineHeight: "2rem",
    },
  },

  text: {
    maxWidth: "650px",
    margin: "0 auto 35px",
    fontSize: "19px",
    lineHeight: 1.6,
    color: "#383b4b",
  },

  button: {
    padding: "16px 40px",
    border: "none",
    borderRadius: "30px",
    background: "#20243a",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: 700,
    cursor: "pointer",
  },
});

export default function FinalSection(): React.ReactElement {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Ready for Your Next Battle?</h2>

      <p className={classes.text}>
        Choose your Pokémon, prepare your strategy, and enter the arena. Your
        journey to become the ultimate trainer starts now.
      </p>

      <button className={classes.button} onClick={() => navigate("/pokemon")}>
        Start Playing
      </button>
    </section>
  );
}
