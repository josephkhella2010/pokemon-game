import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  img: {
    type: String,
    required: true
  },

  type: {
    type: [String],
    required: true
  },

  hp: Number,
  attack: Number,
  defense: Number,
  specialAttack: Number,
  specialDefense: Number,
  speed: Number
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

export default Pokemon;