const express = require("express");
const router = express.Router();
const Category = require("../model/category.model");
const Product = require("../model/product.model");
const Subcategory = require("../model/subcategory.model");

// 1 to Many relationship between categories and subcategories start
Subcategory.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Subcategory, { foreignKey: "categoryId" });
// 1 to Many relationship between categories and subcategories end

router.post("", async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    return res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Subcategory }],
    });
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
