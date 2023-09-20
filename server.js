const express = require("express");
const app = express();
const jsxEngine = require("jsx-view-engine");

//Adding our views templates
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon App!");
});

app.listen(3000, () => {
  console.log("listening");
});