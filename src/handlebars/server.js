const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const Contenedor = require("../container/contenedor");

const contenedor = new Contenedor("Mi Contenedor");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../shared", "index.html"));
});

app.get("/productos", (req, res) => {
  res.render("form", {
    productos: contenedor.productos,
    sinProductos: contenedor.productos.length ? false : true,
  });
});

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (title === "" || undefined) res.render("noData");
  else {
    contenedor.productos.push({ title, price, thumbnail });
    res.redirect("/");
  }
});

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});
