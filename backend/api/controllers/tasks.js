const User = require("../models/users");
const Product = require("../models/products");

const getAllTasks = (req, res) => {
  res.send("Hello from Controller!");
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};


//find User by id
const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email parameter is missing" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(`Error finding user: ${error.message}`);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.status(201).json({ product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ msg: error.message || error });
  }
};

const displayProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products); 
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error displaying product:', error);
    res.status(500).json({ msg: error.message || error });
  }

}

module.exports = {
  getAllTasks,
  createUser,
  findUser,
  createProduct,
  displayProduct
};
