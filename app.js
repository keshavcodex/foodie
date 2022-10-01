require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

function generateRandom(max) {
  let random = Math.random();
  random = Math.floor(random * max);
  return random + 1;
}
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", (req, res) => {
  res.render("index");
});
app.post("/home", (req, res) => {
  var food = req.body.foodName;

  var options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { from: "0", size: "3", q: food },
    headers: {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let n = generateRandom(3);
      //   const fName = response.data.results[2].name;
      //   const receipe = response.data.results[1].instructions[0].display_text;
      //   const receipe = response.data.results[1].instructions[0].display_text;
      const vidUrl = response.data.results[n].original_video_url;
      //   res.send(response.data);
      res.render("home", {
        foodName: "I think i should order " + food + ", right now",
        foodVid: vidUrl,
      });
    })
    .catch(function (err) {
      console.log(err);
      res.redirect("/");
    });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("listening on port 3000!");
});

// video same level-> name, instructions-> display_text
