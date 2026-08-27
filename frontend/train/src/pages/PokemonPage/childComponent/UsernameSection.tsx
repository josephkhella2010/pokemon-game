import { useDispatch } from "react-redux";
import { setUsername } from "../../../Store/slices/pokemon/PokemonSlice";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";

interface PropsType {
  username: string;
  handleConfirm: () => void;
  setShowUsernameSection: (showUsernameSection: boolean) => void;
  showUsernameSection: boolean;
}

const useStyles = createUseStyles({
  startFightContainer: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100dvh",
    zIndex: 1000,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "20px",
    boxSizing: "border-box",

    background:
      "radial-gradient(circle at center, rgba(30, 30, 70, 0.75), rgba(0, 0, 0, 0.95))",

    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },

  modal: {
    width: "100%",
    maxWidth: "430px",
    boxSizing: "border-box",

    padding: "38px 32px 32px",

    background: "linear-gradient(145deg, #18182f, #10101f)",

    border: "1px solid rgba(139, 92, 246, 0.5)",
    borderRadius: "24px",

    boxShadow:
      "0 25px 70px rgba(0, 0, 0, 0.65), 0 0 40px rgba(108, 99, 255, 0.2)",

    textAlign: "center",
  },

  icon: {
    width: "75px",
    height: "75px",

    margin: "0 auto 18px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "50%",

    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",

    boxShadow: "0 10px 35px rgba(108, 99, 255, 0.45)",

    fontSize: "38px",
  },

  title: {
    margin: "0 0 8px",

    color: "#ffffff",

    fontSize: "28px",
    fontWeight: 900,

    letterSpacing: "0.5px",
  },

  subtitle: {
    margin: "0 0 28px",

    color: "#a5a5c7",

    fontSize: "14px",
    lineHeight: 1.6,
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: "18px",
  },

  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",

    transform: "translateY(-50%)",

    fontSize: "18px",

    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "54px",

    boxSizing: "border-box",

    padding: "0 16px 0 48px",

    borderRadius: "14px",

    border: "1px solid rgba(255, 255, 255, 0.12)",

    outline: "none",

    background: "rgba(255, 255, 255, 0.06)",

    color: "#ffffff",

    fontSize: "16px",
    fontWeight: 600,

    transition: "all 0.2s ease",

    "&::placeholder": {
      color: "#777795",
    },

    "&:focus": {
      border: "1px solid #8b5cf6",
      background: "rgba(139, 92, 246, 0.08)",
      boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.12)",
    },
  },

  confirmBtn: {
    width: "100%",
    height: "54px",

    border: "none",
    borderRadius: "14px",

    cursor: "pointer",

    color: "#ffffff",

    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",

    boxShadow: "0 10px 25px rgba(108, 99, 255, 0.35)",

    fontSize: "16px",
    fontWeight: 900,

    letterSpacing: "1px",

    textTransform: "uppercase",

    transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 14px 30px rgba(108, 99, 255, 0.5)",
    },

    "&:active": {
      transform: "translateY(1px)",
    },

    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.45,
      transform: "none",
      boxShadow: "none",
    },
  },

  hint: {
    marginTop: "18px",

    color: "#666681",

    fontSize: "12px",
  },

  "@media (max-width: 480px)": {
    modal: {
      padding: "30px 22px 24px",
    },

    title: {
      fontSize: "24px",
    },

    icon: {
      width: "65px",
      height: "65px",
      fontSize: "32px",
    },
  },
  closeContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
    color: "white",
    position: "absolute",
    top: "20px",
    right: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});

export default function UsernameSection({
  username,
  handleConfirm,
  showUsernameSection,
  setShowUsernameSection,
}: PropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  /* functions */
  function handleClose() {
    setShowUsernameSection(false);
  }

  useEffect(() => {
    if (showUsernameSection) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [showUsernameSection]);

  return (
    <div className={classes.startFightContainer}>
      <div className={classes.closeContainer} onClick={handleClose}>
        <p> X</p>
      </div>
      <div className={classes.modal}>
        <div className={classes.icon}>⚔️</div>

        <h3 className={classes.title}>Enter Your Name</h3>

        <p className={classes.subtitle}>
          Choose your battle name and get ready to fight!
        </p>

        <div className={classes.inputWrapper}>
          <span className={classes.inputIcon}>👤</span>

          <input
            className={classes.input}
            type="text"
            placeholder="Your battle name..."
            value={username}
            maxLength={20}
            autoFocus
            onChange={(e) => {
              dispatch(setUsername(e.target.value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && username.trim()) {
                handleConfirm();
              }
            }}
          />
        </div>

        <button
          className={classes.confirmBtn}
          onClick={handleConfirm}
          disabled={!username.trim()}
        >
          ⚡ CONFIRM & FIGHT
        </button>

        <div className={classes.hint}>
          Enter your name to enter the Pokémon battle
        </div>
      </div>
    </div>
  );
}
