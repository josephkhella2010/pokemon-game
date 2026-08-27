import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayPageContainer from "../PlayPage/PlayPageContainer";
import PokemonPage from "../PokemonPage/PokemonPage";
import HomePage from "../Home/HomePage";
import NavigationPage from "../../Navigation/NavigationPage";
import { createUseStyles } from "react-jss";
import LoadingPage from "../LoadingPage/LoadingPage";
import type { RootState } from "../../Store/store";
import { useSelector } from "react-redux";

const useStyles = createUseStyles({
  mainWrapper: {
    paddingTop: "100px",
  },
});
export default function RouterPage() {
  const classes = useStyles();
  const { isLoading } = useSelector((state: RootState) => state.LoadingSlice);
  return (
    <div>
      <Router>
        <NavigationPage />
        <div className={classes.mainWrapper}>
          {isLoading && <LoadingPage />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon" element={<PokemonPage />} />
            <Route path="/play" element={<PlayPageContainer />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
