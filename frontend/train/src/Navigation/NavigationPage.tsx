import { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  nav: {
    width: "100%",
    padding: "20px 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#202750",
    boxSizing: "border-box",
    position: "fixed",
    zIndex: "10",
    transition: "opacity 0.3s ease",
  },

  logo: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#ffcc00",
    "@media (max-width: 750px)": {
      fontSize: "18px",
    },
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: 600,

    "&:hover": {
      color: "#ffcc00",
    },
    "@media (max-width: 750px)": {
      fontSize: "14px",
    },
  },

  button: {
    border: "none",
    padding: "12px 24px",
    borderRadius: "25px",
    background: "#ffcc00",
    color: "#20243a",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    "@media (max-width: 750px)": {
      fontSize: "12px",
      padding: "10px 10px",
    },

    "&:hover": {
      transform: "translateY(-2px)",
    },
  },

  "@media (max-width: 750px)": {
    nav: {
      padding: "18px 5%",
    },

    links: {
      gap: "15px",
      fontSize: "14px",
    },
  },
  opacity: {
    opacity: "0.8",
  },
});

export default function NavigationPage(): React.ReactElement {
  const classes = useStyles();
  const Navigate = useNavigate();

  /*  function */
  useEffect(() => {
    const navigation = document.querySelector("#nav");

    if (!navigation) return;

    const handleScroll = () => {
      if (window.scrollY > 60) {
        navigation.classList.add(classes.opacity);
      } else {
        navigation.classList.remove(classes.opacity);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [classes.opacity]);

  return (
    <nav className={classes.nav} id="nav">
      <div className={classes.logo}>⚡ PokéBattle</div>

      <div className={classes.links}>
        <a href="/" className={classes.link}>
          Home
        </a>

        <button className={classes.button} onClick={() => Navigate("/pokemon")}>
          Start Battle
        </button>
      </div>
    </nav>
  );
}
