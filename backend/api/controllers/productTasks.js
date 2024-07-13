const Product = require("../models/products");

const createProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({ product });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ msg: error.message || error });
    }
  };

  const displayProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ products });
    } catch (error) {
      console.error("Error displaying product:", error);
      res.status(500).json({ msg: error.message || error });
    }
  };

  const deleteProducts = async (req, res) => {
    try {
      const { productName } = req.params;
      const product = await Product.findOne({ productName });
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      await Product.deleteOne({ productName });
      res.status(202).json({ msg: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ msg: error.message || error });
    }
  }

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

  const deleteComponent = async (req, res) => {
    try {
      const productName = req.params.productName;
      const componentLabel = req.params.componentLabel;
      const product = await Product.findOne({ productName });
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      } else {
        const component = product.components.find(c => c.componentLabel === componentLabel);
        if (!component) {
          return res.status(404).json({ msg: "Component not found" });
        }
        await Product.updateOne({ productName }, { $pull: { components: { componentLabel } } });
        res.status(202).json({ msg: "Component deleted successfully" });
      }
    } catch (error) {
      console.error("Error deleting component:", error);
      res.status(500).json({ msg: error.message || error });
    }
  }

  const createComponent = async (req, res) => {
    try {
      const { productName, component } = req.body;

      const product = await Product.findOne({ productName });
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      product.components.push(component);
      await product.save();
      res.status(201).json({ msg: "Component added successfully"});
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

  const deletePart = async (req, res) => {
    try {
      const { productName, componentLabel, partLabel } = req.params;

      const product = await Product.findOne({ productName });
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      const component = product.components.find(c => c.componentLabel === componentLabel);
      if (!component) {
        return res.status(404).json({ msg: "Component not found" });
      }
      const result = await Product.updateOne(
        { productName, 'components.componentLabel': componentLabel },
        { $pull: { 'components.$.partList': { partLabel } } }
      );

      if (result.modifiedCount === 0) {
        console.log("Part not found");
        return res.status(404).json({ msg: "Part not found" });
      }

      res.status(202).json({ msg: "Part deleted successfully" });
    } catch (error) {
      console.error("Error deleting Part:", error);
      res.status(500).json({ msg: error.message || error });
    }
  };

  module.exports = {
    createProduct,
    displayProducts,
    deleteProducts,
    displayComponents,
    createComponent,
    deleteComponent,
    createParts,
    displayParts,
    deletePart,
  };