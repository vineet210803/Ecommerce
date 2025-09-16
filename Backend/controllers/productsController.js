import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images=[image1, image2, image3,image4].filter((item)=>item!==null)

    let imagesUrl = await 

    res.json({
      success: true,
      message: "Product added successfully",
      data: {
        name,
        description,
        price,
        category,
        subCategory,
        size,
        bestseller,
        images,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {};

const removeProduct = async (req, res) => {};

// fun for single product info
const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
