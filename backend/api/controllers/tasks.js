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

//Products

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(product);
    res.status(201).json({ product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ msg: error.message || error });
  }
};

const displayProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error displaying product:", error);
    res.status(500).json({ msg: error.message || error });
  }
};

// Function to display all components
const displayComponents = async (req, res) => {
  productName = req.params.productName;
  try {
    const product = await Product.findOne({ productName });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const components = product.components;
    res.status(200).json({ components });
  } catch (error) {
    console.error("Error displaying components:", error);
    res.status(500).json({ msg: error.message || error });
  }
};

const createComponent = async (req, res) => {
  try {
    const { productName, component } = req.body;

    const product = await Product.findOne({ productName });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    product.components.push(component);
    await product.save();
    res.status(201).json({ msg: "Component added successfully", product });
  } catch (error) {
    console.error("Error creating component:", error);
    res.status(500).json({ msg: error.message || error });
  }
};

const createParts = async (req, res) => {
  try {
    const { productName, component: { componentLabel, partList } } = req.body;

    const product = await Product.findOne({ productName });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const component = product.components.find(c => c.componentLabel === componentLabel);
    if (!component) {
      return res.status(404).json({ msg: "Component not found" });
    }
    if(partList.length === 0){
      return res.status(400).json({ msg: "Part list is empty" });
    }
    component.partList.push(partList);
    await product.save();
    res.status(201).json({ msg: "Part added successfully", product });
  } catch (error) {
    console.error("Error creating part:", error);
    res.status(500).json({ msg: error.message || error });
  }
};

const displayParts = async (req, res) => {
  try {
    const { productName, componentLabel } = req.params;

    const product = await Product.findOne({ productName });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const component = product.components.find(c => c.componentLabel === componentLabel);
    if (!component) {
      return res.status(404).json({ msg: "Component not found" });
    }
    
    res.status(200).json({ parts: component.partList });
  } catch (error) {
    console.error("Error displaying parts:", error);
    res.status(500).json({ msg: error.message || error });
  }
};


module.exports = {
  getAllTasks,
  createUser,
  findUser,
  createProduct,
  displayProducts,
  displayComponents,
  createComponent,
  createParts,
  displayParts,
};
