import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  section: {
    padding: "90px 8%",
    background: "#20243a",
    textAlign: "center",
  },

  title: {
    fontSize: "42px",
    color: "#ffffff",
    marginBottom: "15px",
    lineHeight: "2.5rem",

    "@media (max-width: 750px)": {
      fontSize: "24px",
    },
  },

  text: {
    color: "#c5c9d8",
    fontSize: "18px",
    marginBottom: "45px",
  },

  leaderboard: {
    maxWidth: "700px",
    margin: "0 auto",
  },

  player: {
    display: "grid",
    gridTemplateColumns: "60px 1fr 100px",
    alignItems: "center",
    padding: "20px",
    marginBottom: "12px",
    background: "#2d324d",
    borderRadius: "14px",
    color: "#ffffff",
  },

  rank: {
    fontSize: "22px",
    fontWeight: 700,
  },

  name: {
    textAlign: "left",
    fontWeight: 600,
  },

  points: {
    textAlign: "right",
    color: "#ffcc00",
    fontWeight: 700,
  },

  "@media (max-width: 500px)": {
    player: {
      gridTemplateColumns: "45px 1fr 80px",
    },
  },
});

interface Player {
  rank: number;
  name: string;
  points: number;
}

const players: Player[] = [
  {
    rank: 1,
    name: "DragonMaster",
    points: 9850,
  },
  {
    rank: 2,
    name: "PikaTrainer",
    points: 9420,
  },
  {
    rank: 3,
    name: "BattleKing",
    points: 8970,
  },
  {
    rank: 4,
    name: "ThunderAce",
    points: 8540,
  },
];

export default function LeaderboardSection(): React.ReactElement {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Top Trainers</h2>

      <p className={classes.text}>
        Battle your way to the top and become a legendary trainer.
      </p>

      <div className={classes.leaderboard}>
        {players.map((player) => (
          <div className={classes.player} key={player.rank}>
            <div className={classes.rank}>#{player.rank}</div>

            <div className={classes.name}>{player.name}</div>

            <div className={classes.points}>
              {player.points.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
