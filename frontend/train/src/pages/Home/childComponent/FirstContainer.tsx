import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  firstContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "30px",
    padding: "80px 8%",
    "@media (max-width: 750px)": {
      gridTemplateColumns: "repeat(1,1fr)",
      gap: "20px",
      textAlign: "center",
    },
  },
  firstSection: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    width: "100%",
  },
  textContainer: {
    "@media (max-width: 750px)": {
      order: "2",
      textAlign: "center",
    },
  },
  imgContainer: {
    "@media (max-width: 750px)": {
      order: "1",
    },
    "& img": {
      width: "100%",
      height: "300px",
      borderRadius: "15px",
    },
  },
  title: {
    color: "#20243a",
  },
});
export default function FirstContainer() {
  const classes = useStyles();
  return (
    <div className={classes.firstContainer}>
      <div className={`${classes.firstSection}   ${classes.textContainer}`}>
        <h2 className={classes.title}>Start Your Pokémon Adventure</h2>
        <h2 className={classes.title}>Start Your Pokémon Adventure</h2>
        <h2 className={classes.title}>Start Your Pokémon Adventure</h2>
        <h2 className={classes.title}>Start Your Pokémon Adventure</h2>
        <h2 className={classes.title}>Start Your Pokémon Adventure</h2>

        <p>
          Explore a world full of amazing creatures, exciting battles, and
          unforgettable adventures. Catch new Pokémon, build your dream team,
          train your companions, and discover what awaits beyond every path.
        </p>
      </div>
      <div className={`${classes.firstSection}   ${classes.imgContainer}`}>
        <img src="/foto/pokemonHomeOne.jpg" alt="not found" />
      </div>
    </div>
  );
}
