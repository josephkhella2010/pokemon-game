import { createUseStyles } from "react-jss";
import FirstContainer from "./childComponent/FirstContainer";
import BattleSection from "./childComponent/BattleSection";
import TeamSection from "./childComponent/TeamSection";
import ExploreSection from "./childComponent/ExploreSection";
import LeaderboardSection from "./childComponent/LeaderboardSection";
import FinalSection from "./childComponent/FinalSection";

const useStyles = createUseStyles({
  homePage: {
    width: "100%",
    overflow: "hidden",
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.homePage}>
      <FirstContainer />

      <BattleSection />

      <TeamSection />

      <ExploreSection />

      <LeaderboardSection />

      <FinalSection />
    </div>
  );
}
