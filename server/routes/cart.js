const express = require("express");
const router = express.Router();
const knex = require("../knex");

const authorizeUser = require("../common/authorize");

router.post("/cart", authorizeUser, (req, res, next) => {
  // TO-DO: Verification of req.body for product

  console.log(req.body);

  const cartProduct = { user_id: req.claim.userId, product_id: req.body.id, quantity: req.body.quantity };

  knex("carts").where("user_id", cartProduct.user_id).andWhere("product_id", cartProduct.product_id)
    .then((result) => {
      console.log("Does it exist?: ", result);
      if (result.length) {
        cartProduct.quantity += result[0].quantity;
        return knex("carts").update(cartProduct).where("product_id", cartProduct.product_id);
      }
      else {
        return knex("carts").insert(cartProduct);
      }
    })
    .then((result) => {
      console.log("This was either updated or inserted: ", cartProduct);
      res.send(result[0]);
    });
});

router.get("/cart", authorizeUser, (req, res, next) => {
  knex("carts").where("user_id", req.claim.userId).innerJoin("products", "products.id", "carts.product_id").orderBy("carts.created_at")
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

router.delete("/cart/:id", authorizeUser, (req, res, next) => {
  const productId = parseInt(req.params.id);
  if (isNaN(productId || productId < 0)) { next("Invalid product Id"); }

  console.log("Product ID:", productId, "User ID:", req.claim.userId);
  
  knex("carts").where("user_id", req.claim.userId).andWhere("product_id", productId).delete()
    .then((result) => {
      return knex("carts").where("user_id", req.claim.userId).innerJoin("products", "products.id", "carts.product_id");
    })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

module.exports = router;