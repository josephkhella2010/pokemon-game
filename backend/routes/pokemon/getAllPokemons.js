import express from "express";
import Pokemon from "../../database/models/pokemon.js";

const router = express.Router();

router.get("/pokemons", async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    return res.status(200).json({
      pokemons: pokemons,
      message: "sucessfu lly added Pokemon",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error with get All pokemona request ",
      error: error.message,
    });
  }
});

export default router;
