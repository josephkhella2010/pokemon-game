import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/config/db.js";

import addPokemon from "./routes/pokemon/addPokemon.js";
import getPokemons from "./routes/pokemon/getAllPokemons.js";
import deletePokemon from "./routes/pokemon/deletePokemon.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", addPokemon);
app.use("/api", getPokemons);
app.use("/api", deletePokemon);
app.get("/", (req, res) => {
  res.send("Backend is working! Version 1");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
