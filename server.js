const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");
const pokemon = require("./models/pokemon");

app.use((req, res, next) => {
  next();
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.get("/pokemon", (req, res) => {
  res.render("Index", { pokemon: pokemon });
});

app.get("/pokemon/NewPoke", (req, res) => {
  res.render("NewPoke");
});

app.post("/pokemon/NewPoke/", (req, res) => {
  const newPoke = {
    name: req.body.name,
    img: req.body.img,
    evolved: req.body.evolved === "on",
  };
  pokemon.push(newPoke);
  res.redirect("/pokemon");
});

app.get("/pokemon/:id", (req, res) => {
  const pokemonId = req.params.id;
  const pokemonData = pokemon[pokemonId];
  res.render("Show", { pokemonData });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
