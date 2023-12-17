const Property = require('../models/Property');
const Portion = require('../models/Portion');

const propertyController = {
    async getAllProperties(req, res) {
        try {
            const properties = await Property.find().populate({
                path: 'portions',
                populate: { path: 'broker landlord' }, // Populate broker and landlord details
            });
            res.json(properties);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getPropertyById(req, res) {
        try {
            const property = await Property.findById(req.params.id).populate({
                path: 'portions',
                populate: { path: 'broker landlord' },
            });
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
            res.json(property);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteProperty(req, res) {
        try {
            const propertyId = req.params.id;

            // Find the property and its associated portions
            const property = await Property.findById(propertyId).populate('portions');

            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }

            // Delete each associated portion
            for (const portion of property.portions) {
                await Portion.findByIdAndDelete(portion._id);
            }

            // Delete the property itself
            await Property.findByIdAndDelete(propertyId);

            res.json({ message: 'Property and associated portions deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateProperty(req, res) {
        try {
            const propertyId = req.params.id;

            // Find the property
            const property = await Property.findById(propertyId);

            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }

            // Update the property
            const updatedProperty = await Property.findByIdAndUpdate(propertyId, req.body, {
                new: true,
                runValidators: true,
            });

            res.json(updatedProperty);
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Mongoose validation error
                const validationErrors = Object.values(error.errors).map(err => err.message);
                res.status(400).json({ error: 'Validation Error', messages: validationErrors });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },
};

module.exports = propertyController;
