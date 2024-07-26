const mongoose = require('mongoose');
const { Schema } = mongoose;

const componentSchema = new Schema({
  partLabel: { type: String },
  serialNumbers: { type: [String] }
});

const InstanceSchema = new Schema({
  droneID: { type: String, required: false},
  productName: { type: String, required: false},
  assembledBy: { type: String, required: false},
  assembledOn: { type: Date, required: false},
  status: { 
    type: String, 
    enum: ['archived', 'completed'], 
    required: true,
    default: 'archived' 
  },
  components: [componentSchema]
});

module.exports = mongoose.model('Instance', InstanceSchema);
