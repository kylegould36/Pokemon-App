const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.static("public"));

const Pokemon = require("./models/pokemon");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  console.log("Running");
  next();
});

app.use(methodOverride("_method"));

app.set("view engine", "jsx");

app.engine("jsx", jsxEngine());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", async (req, res) => {
  try {
    const pokemon = await Pokemon.find();
    res.render("pokemon/Index", { pokemon });
  } catch (error) {
    console.error(error);
  }
});

app.get("/pokemon/new", (req, res) => {
  res.render("pokemon/New");
});

app.post("/pokemon", async (req, res) => {
  try {
    let evolved = false;
    if (req.body.evolved === "on") {
      evolved = true;
    }
    const newPoke = new Pokemon({
      name: req.body.name,
      img: req.body.img,
      evolved: evolved,
    });
    await newPoke.save();
    res.redirect("/pokemon");
  } catch (error) {
    console.error(error);
  }
});

app.get("/pokemon/:id/edit", async (req, res) => {
  try {
    const editPokemon = await Pokemon.findById(req.params.id);
    res.render("pokemon/Edit", {
      pokemon: editPokemon,
    });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message });
  }
});

app.put("/pokemon/:id", async (req, res) => {
  try {
    if (req.body.evolved === "on") {
      req.body.evolved = true;
    } else {
      req.body.evolved = false;
    }
    await Pokemon.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/pokemon");
  } catch (error) {
    console.error(error);
  }
});

app.delete("/pokemon/:id", async (req, res) => {
  try {
    await Pokemon.findByIdAndDelete(req.params.id);
    res.redirect("/pokemon");
  } catch (error) {
    console.error(error);
  }
});

app.get("/pokemon/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    res.render("pokemon/Show", { pokemonData: pokemon });
  } catch (error) {
    console.error(error);
  }
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
