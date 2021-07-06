const express = require("express");
const routes = express.Router();

routes.get("/register_user", (req, res) => {
    res.render("register_user");
});

routes.get("/register_category", (req, res) => {
    res.render("register_category");
});

routes.get("/poem:id", (req, res) => {
    res.render("poem");
});


module.exports = routes;