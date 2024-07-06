const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for components
const componentSchema = new Schema({
  componentLabel: { type: String },
  serialNumbers: { type: [String] }
});

// Schema for the drone assembly
const InstanceSchema = new Schema({
  droneID: { type: String, required: false},
  productName: { type: String, required: false },
  assembledBy: { type: String, required: false },
  assembledOn: { type: Date, required: false },
  progress: { 
    type: String, 
    enum: ['archived', 'in-progress', 'completed'], 
    required: true,
    default: 'in-progress' 
  },
  components: [componentSchema]
});

module.exports = mongoose.model('Instance', InstanceSchema);
