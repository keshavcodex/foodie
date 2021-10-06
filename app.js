require('dotenv').config();
const express = require("express");
const axios = require("axios").default;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

function generateRandom() {
    let random = Math.random();
    random = Math.floor( random * 25);
    if(random == 6){
        random++;
    }
    return random;
}
app.get("/", (req, res)=>{
    res.render("index");
});
app.get("/home", (req, res)=>{
    res.render("index");
});
app.post("/home", (req, res)=>{
    let n = generateRandom();
    var food = req.body.foodName;
    
    var options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: {from: '2', size: '25', q: food},
        headers: {
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        }
      };

    axios.request(options).then(function (response) {
        const imgUrl = response.data.results[n].thumbnail_url;
        res.render("home",{foodImg: imgUrl});
    }).catch(function (err) {
        console.log(err);
        res.redirect("/");
    });
});

app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log("listening on port 3000!");
});
