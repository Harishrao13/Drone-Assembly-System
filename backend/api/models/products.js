const mongoose = require('mongoose');

// Schema for individual parts within a component
const PartSchema = new mongoose.Schema({
  label: { type: String, required: true },
  code: { type: String, required: true }
});

// Schema for components of a product
const ComponentSchema = new mongoose.Schema({
  label: { type: String, required: true },
  code: { type: String, required: true },
  partList: [PartSchema] // An array of parts
});

// Schema for the product
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  components: [ComponentSchema]
});

module.exports = mongoose.model('Products', ProductSchema);
