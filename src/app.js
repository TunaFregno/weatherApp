import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import express from "express";
import { geocoder, forecast } from "./lib/utils.js";

const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engines and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static dir to serve static files
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    h1: "Weather 🌞",
    name: "Valentina Sulbaran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    h1: "About Us 👽",
    name: "Valentina Sulbaran",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    h1: "Help ☂️",
    name: "Valentina Sulbaran",
  });
});

app.get("/weather", (req, res) => {
  const command = req.query.address;

  if (!command) {
    return res.send({ error: "Please provide an address." });
  }

  geocoder(command, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        response,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    h1: "Error 404",
    errorMsg: "Page not found",
    name: "Valentina Sulbaran",
  });
});

app.listen(port, () => console.log(`Server is up on port ${port}!`));
