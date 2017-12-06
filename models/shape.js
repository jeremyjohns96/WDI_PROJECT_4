const mongoose = require('mongoose');

const shapeSchema = mongoose.Schema({
  name: { type: String, required: 'Title is required' },
  image: { type: String, required: 'Image is required' }
});

module.exports = mongoose.model('Shape', shapeSchema);