const express = require("express");
const router = express.Router();
const knex = require("../knex");

router.get("/products", (req, res, next) => {
  knex("products")
    .then((response) => {
      if (response.length) {
        res.send(response);
      }
      else {
        res.send("No products found");
      }
    });
});

router.get("/products/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id < 0) { return next("Invalid product id"); }

  knex("products").where("id", id)
    .then((response) => {
      if (response.length) {
        res.send(response[0]);
      }
      else {
        res.send("No product found");
      }
    });
});

router.get("/products/category/:category", (req, res, next) => {
  const category = req.params.category;

  knex("products").where("category", category)
    .then((response) => {
      if (response.length) {
        res.send(response);
      }
      else {
        res.send([]);
      }
    });
});

router.get("/products/search/:searchTerm", (req, res, next) => {
  let searchTerm = req.params.searchTerm.split(" ");
  searchTerm = searchTerm.map(val => `%${val}%`).join(" ");

  knex("products").where("name", "ilike", searchTerm)
    .then((response) => {
      if (response.length) {
        res.send(response);
      }
      else {
        res.send([]);
      }
    });
});

module.exports = router;