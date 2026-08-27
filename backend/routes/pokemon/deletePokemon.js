import express from "express";
import Pokemon from "../../database/models/pokemon.js";

const router = express.Router();

router.delete("/delete-pokemon/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPokemon = await Pokemon.findByIdAndDelete(id);

    if (!deletedPokemon) {
      return res.status(404).json({
        message: "Pokemon not found",
      });
    }
    const restOfPokemon = await Pokemon.find();

    return res.status(200).json({
      message: "sucessfully deleted Pokemon",
      pokemons: restOfPokemon,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error with delete pokemon request ",
      error: error.message,
    });
  }
});

export default router;
