const express = require("express");
const { json, Op } = require("sequelize");
const router = express.Router();
const fs= require('fs');
const path = require('path');
const Product = require("../model/product.model");
const Category = require("../model/category.model");
const Subcategory = require("../model/subcategory.model");
const { uploadMultiple } = require("../middleware/upload");
//! one to many relationship between products and categories
Product.belongsTo(Subcategory, { foreignKey: "categoryId" });
Subcategory.hasMany(Product, { foreignKey: "categoryId" });
//! one to many relationship between products and categories
// get all products
router.get("", async (req, res, next) => {
  try {
    //!pagination initial values
    let limit = +(req.query.limit) || 10
    let page = +(req.query.page) ||1
    let offset = (page-1 )* limit;
    //!check for search query
    if (req.query.search) {
      const allItems = await Product.findAll({
        include: Subcategory,
        where: {
          [Op.or]: [
            { productName: { [Op.like]: "%" + req.query.search + "%" } },
            { productBrand: { [Op.like]: "%" + req.query.search + "%" } },
          ],
        },
        limit,
        offset
      });
      return res.status(200).send(allItems);
    }
    //! if no search query return all products with paginated data
    const allProducts = await Product.findAll({ include: Subcategory , limit,offset });
    return res.status(200).send(allProducts);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//! get total number of pages for the client pagination 
router.get('/pages', async (req, res, next) => {
    try {
      const limit = +(req.query.limit) || 10;
      const allProducts = await Product.findAll();
      const totalPages= Math.ceil(allProducts.length / limit)
       return res.status(200).send({totalPages})      
    } catch (error) {
      return res.status(500).send({message:error});
    }
})
router.get("/:url", async (req, res) => {
  try {
    const singleProduct = await Product.findOne({
      include: Subcategory,
      where: { productId: req.params.url },
    });
    return res.status(200).send(singleProduct);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("", uploadMultiple("productImages"),async (req, res, next) => {
  const images = {};
  images.allImage = req.files;

  try {
    const product = await Product.create({
      ...req.body,
      productImages: req.files,
    });

    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//!update product images of  single product 
router.patch("/product/update-images/:id", uploadMultiple("productImages"), async (req, res) => {
  try {
    // console.log(' reciveing images from postman',req.files)
    const currentProduct = await Product.findOne({
      include: Subcategory,
      where: { productId: req.params.id },
    });
    // const {firstName,lastName,email,phone,gender}=req.body;
    const isProductImagesUpdated = await Product.update(
      { productImages: req.files },
      { where: { productId: req.params.id } }
    );
    if (isProductImagesUpdated[0] === 1) {
      //** deleting all the old file paths of the current product */
      // if (currentUser.profile_pic !== null) {
      //   const deletePath = "../uploads/" + currentUser.profile_pic;
      //   fs.unlinkSync(path.join(__dirname, deletePath));
      // }
      for( let i=0;i<currentProduct.productImages?.length;i++){
        const deletePath = "../uploads/" +currentProduct.productImages[i]?.filename;
           fs.unlinkSync(path.join(__dirname, deletePath));
      }

      return res.status(200).send({message:'Product images updated successfully'});
    }

    return res
      .status(200)
      .send({ message: "Product not found", isUpdated: isProductImagesUpdated[0] });
  } catch (error) {
    // console.log('error while updating product images', error);
    return res.status(401).send({ message: error.message });
  }
});
module.exports = router;
