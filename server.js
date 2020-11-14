const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const apiKey = "10a0ac55d5112929079208987d6bcecf";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});
app.post("/", function (req, res) {

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey.key}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render("index", { weather: null, error: "Ugh.. someting happened, try again" });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render("index", {weather: null, error: "Ugh.. someting happened, try again",});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let weatherTextExpanded = `It's ${weather.main.temp} degrees, with
          ${weather.main.humidity}% humidity in ${weather.name}!`;
        res.render("index", { weather: weatherTextExpanded, error: null });
      }
    }
  });
});

app.listen(3000, function () {
    console.log("Server listening on port 3000...");
});
