const express = require("express");
const router = express.Router();
const Subcategory = require("../model/subcategory.model");
const Category = require("../model/category.model");
const Product = require("../model/product.model");
//get all subcategory  with slug list
router.get("/:name", async (req, res) => {
  try {
    const allsubcategories = await Subcategory.findAll({
      include: [{ model: Category }, { model: Product }],
      where: { sub_categoryName: req.params.name },
    });
    return res.status(200).send(allsubcategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//get all subcategory  with category Id 
router.get("/category/:id", async (req, res) => {
  try {
    const allsubcategories = await Subcategory.findAll({
      include: [{ model: Category }, { model: Product }],
      where: { categoryId: req.params.id },
    });
    return res.status(200).send(allsubcategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//!! get all product of a single subcategory by subcategory id
router.get("/products/:id", async (req, res) => {
  try {
    const allsubcategories = await Subcategory.findAll({
      include: [{ model: Category }, { model: Product }],
      where: { sub_categoryId: req.params.id },
    });
    return res.status(200).send(allsubcategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//get all subcategory without slug list
router.get("", async (req, res) => {
  try {
    const allsubcategories = await Subcategory.findAll({
      include: [{ model: Category }, { model: Product }]
    });
    return res.status(200).send(allsubcategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});





// create new subcategory
router.post("", async (req, res) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    return res.status(201).send(subcategory);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
