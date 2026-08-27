import { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/store";

const useStyles = createUseStyles({
  loadingContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#6d6570d4",
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: "400",
  },
  spinnerSection: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "50px",
  },

  spinner: {
    position: "relative",
    marginBottom: "30px",
  },

  circle: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#754089",
    animation: "$fade 1.2s linear infinite",
  },

  "@keyframes fade": {
    "0%,39%,100%": {
      opacity: 0.2,
    },
    "40%": {
      opacity: 1,
    },
  },
  Text: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "cursive",
  },
});

export default function LoadingPage() {
  const classes = useStyles();

  const { isLoading } = useSelector((state: RootState) => state.LoadingSlice);
  useEffect(() => {
    if (isLoading) {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isLoading]);
  console.log(isLoading);

  return (
    <div className={classes.loadingContainer}>
      <div className={classes.spinnerSection}>
        <div className={classes.spinnerContent}>
          <div className={classes.spinner}>
            {Array.from({ length: 12 }).map((_, index) => {
              const angle = index * 30;
              const radius = 34;

              return (
                <span
                  key={index}
                  className={classes.circle}
                  style={{
                    transform: `rotate(${angle}deg) translate(${radius}px)`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              );
            })}
          </div>
          <p className={classes.Text}>Loading </p>
        </div>
      </div>
    </div>
  );
}
