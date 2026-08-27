import express from "express";
import Pokemon from "../../database/models/pokemon.js";

const router = express.Router();

router.post("/add-pokemon", async (req, res) => {
  try {
    const {
      name,
      img,
      type,
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    } = req.body;
    const fields = {
      name,
      img,
      type,
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    };

    if (
      Object.values(fields).some(
        (value) => value === undefined || value === null || value === "",
      )
    ) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const newPokemon = {
      name,
      img,
      type,
      hp,
      attack,
      defense,
      specialAttack,
      specialDefense,
      speed,
    };

    const pokemon = await Pokemon.create(newPokemon);
    return res.status(200).json({
      pokemon: pokemon,
      message: "sucessfu lly added Pokemon",
    });
  } catch (error) {
    return res.status(500).json({
      message: "error with post add pokemon request ",
      error: error.message,
    });
  }
});

export default router;
