import mongoose from "mongoose";
import Mproduct from "../models/product.js"

// use convention json {success , message  , data}

// @desc create product
// @route POST /api/products
// @access public
export const createProduct = async (req, res) => {
  const product = req.body; // User's data

  // Validate input fields
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  // Create a new product instance
  const newProduct = new Mproduct(product);

  try {
    // Save the product to the database
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// @desc fetch all product
// @route POST /api/products
// @access public
export const fetchProducts =async (req, res) => {
  try {
    const Allproduct = await Mproduct.find({}); // empty {} means fetch all from database
    res.status(201).json({
      success: true,
      message: "Success fetching all products",
      data: Allproduct,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: " Server Error",
      error: err.message,
    });
  }
}


// @desc update product
// @route POST /api/products
// @access public
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: " Product Not Availabe or Invalid product ID",
    });
  }

  try {
    const newPro = await Mproduct.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: newPro,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// @desc delete product
// @route POST /api/products
// @access public
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: " Product Not Availabe or Invalid product ID",
      });
    }
    try {
      const proDelete = await Mproduct.findById(id);
      await Mproduct.findByIdAndDelete(id);
      res.status(201).json({
        success: true,
        message: "Product deleted Successfully",
        data : proDelete
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    }
  }
