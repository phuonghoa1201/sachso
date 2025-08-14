const mongoose = require('mongoose')
const cognitionLevelSchema = new mongoose.Schema({
  name: { type: String, required: true },

});

const CognitionLevel = mongoose.model('CognitionLevel', cognitionLevelSchema);

module.exports = CognitionLevel;