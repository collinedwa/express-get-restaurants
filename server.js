const express = require("express");
const {check, validationResult} = require("express-validator");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const restaurantRoutes = require("./routes/restaurantRoutes");


const port = 3000;
app.use(express.json());

app.use("/restaurants", restaurantRoutes)

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})