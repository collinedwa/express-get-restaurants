const express = require("express");
const {check, validationResult} = require("express-validator");
const {Restaurant} = require("../models/index");
const {sequelize} = require("../db");

const restaurantRoutes = express.Router();

restaurantRoutes.get("/", async (request, response) => {
    restaurantList = await Restaurant.findAll();

    response.json(restaurantList);
})

restaurantRoutes.get("/:id", async (req, res) => {
    foundRestaurant = await Restaurant.findByPk(req.params.id);

    res.json(foundRestaurant);
})

restaurantRoutes.post("/", [
check("name").notEmpty().trim().isLength({min: 10, max:30}),
check("location").notEmpty().trim(),
check("cuisine").notEmpty().trim()],
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){ 
        res.json({error: errors.array()});
    }else{
        newRestaurant = await Restaurant.create({
            name: req.body.name,
            location: req.body.location,
            cuisine: req.body.cuisine
        });
        res.json(newRestaurant);
    }
})

restaurantRoutes.put("/:id", async (req, res) => {
    foundRestaurant = await Restaurant.findByPk(req.params.id);
    await foundRestaurant.update({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    });

    res.json(foundRestaurant);
})

restaurantRoutes.delete("/:id", async (req, res) => {
    foundRestaurant = await Restaurant.findByPk(req.params.id);
    await foundRestaurant.destroy();

    res.send("Deleted!");
})

module.exports = restaurantRoutes;