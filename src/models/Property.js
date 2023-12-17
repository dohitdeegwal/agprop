const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    portions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Portion', required: true }],
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
