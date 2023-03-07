const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;
app.use(express.json());
//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (request, response) => {
    restaurantList = await Restaurant.findAll();

    response.json(restaurantList);
})

app.get("/restaurants/:id", async (req, res) => {
    foundRestaurant = await Restaurant.findByPk(req.params.id);

    res.json(foundRestaurant);
})

app.post("/restaurants", async (req, res) => {
    newRestaurant = await Restaurant.create({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    });

    res.json(newRestaurant);
})

app.put("/restaurants/:id", async (req, res) => {
    foundRestaurant = await Restaurant.findByPk(req.params.id);
    await foundRestaurant.update({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    });

    res.json(foundRestaurant);
})

app.delete("/restaurants/:id", async (req, res) => {
    foundRestaurant = await Restaurant.findByPk(req.params.id);
    await foundRestaurant.destroy();

    res.send("Deleted!");
})


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})