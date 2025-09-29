import productModel from "../models/productModel.js";
import {v2 as cloudinary} from 'cloudinary';

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const images=[image1, image2, image3,image4].filter((item)=>item!==null)

    let imagesUrl = await Promise.all(
        images.map(async (item)=>{
            let result = await cloudinary.uploader.upload(item.path)
            return result.secure_url
        })
    )
    const productData = {
        name,
        description,
        price: Number(price),
        image: imagesUrl,
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller==="true"? true : false, 
        date: Date.now()

    }    
    // console.log(productData);

    const product = new productModel(productData) 
    await product.save()

    res.json({
      success: true,
      message: "Product Added!!"
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success: true, products})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
};

const removeProduct = async (req, res) => {
  try {
    
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true, message: "product removed!!"})

  } catch (error) {
    res.json({success:false, message: error.message})
  }
};

// fun for single product info
const singleProduct = async (req, res) => {

  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success: true, product})
    // console.log(product)
    
  } catch (error) {
    res.json({success: false, message: error.message})
  }

};

export { addProduct, listProducts, removeProduct, singleProduct };
