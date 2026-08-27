import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../Store/slices/pokemon/PokemonSlice";
import { createUseStyles } from "react-jss";

interface PaginationSectionProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
}

const useStyles = createUseStyles({
  paginationMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "0px",
    width: "100%",
    left: "0px",
    "@media (max-width: 450px)": {
      width: "100%",
    },
  },

  paginationContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px 0",
    padding: "12px 18px",
    background: "#20243ad1",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",

    width: "90%",
    "@media (max-width: 450px)": {
      gap: "6px",
    },
  },

  pagesContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "center",

    "@media (max-width: 450px)": {
      gap: "5px",
    },
  },

  btn: {
    minWidth: "85px",
    height: "40px",

    padding: "8px 14px",

    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "20px",

    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    color: "white",
    cursor: "pointer",

    transition: "all 0.25s ease",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      transform: "translateY(-2px)",
      background: "rgba(255, 255, 255, 0.18)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },

    "&:disabled": {
      opacity: 0.35,
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },

    "@media (max-width: 450px)": {
      minWidth: "40px",
      padding: "12px",

      "&:first-child": {
        fontSize: "11px",
      },

      "&:last-child": {
        fontSize: "11px",
      },
    },
  },

  paginationBtn: {
    width: "40px",
    height: "40px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: 0,

    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "50%",

    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",

    color: "white",
    cursor: "pointer",

    transition: "all 0.25s ease",

    "&:hover": {
      transform: "translateY(-3px) scale(1.05)",
      background: "rgba(255, 255, 255, 0.2)",
    },

    "@media (max-width: 450px)": {
      //width: "34px",
      height: "34px",
      fontSize: "14px",
    },
  },

  activePage: {
    background: "linear-gradient(135deg, #ff9800, #ff5722)",
    color: "white",

    border: "1px solid rgba(255, 255, 255, 0.5)",

    boxShadow: "0 5px 20px rgba(255, 152, 0, 0.4)",

    transform: "scale(1.08)",

    "&:hover": {
      background: "linear-gradient(135deg, #ff9800, #ff5722)",
      transform: "scale(1.12)",
    },
  },
});

export default function PaginationSection({
  currentPage,
  totalPages,
  pageNumbers,
}: PaginationSectionProps) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePageClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={classes.paginationMainContainer}>
      <div className={classes.paginationContainer}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={classes.btn}
        >
          ← Previous
        </button>

        <div className={classes.pagesContainer}>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`${classes.paginationBtn} ${
                page === currentPage ? classes.activePage : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={classes.btn}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
