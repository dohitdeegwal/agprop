const Portion = require('../models/Portion');
const Property = require('../models/Property');
const Landlord = require('../models/Landlord');
const Broker = require('../models/Broker');

const portionController = {
    async createPortion(req, res) {
        try {
            const { propertyId, landlordId, brokerId, ...portionData } = req.body;

            let property, landlord, broker;

            // Check if the landlord exists
            landlord = await Landlord.findById(landlordId);
            if (!landlord) {
                return res.status(404).json({ error: 'Landlord not found' });
            }

            // Check if the broker exists
            broker = await Broker.findById(brokerId);
            if (!broker) {
                return res.status(404).json({ error: 'Broker not found' });
            }

            // Check if the property exists
            if (propertyId) {
                property = await Property.findById(propertyId);
                if (!property) {
                    console.log('Property not found');
                    return res.status(404).json({ error: 'Property not found' });
                }
            } else {
                // Create a new property if propertyId is not provided
                property = await Property.create({name: portionData.propertyName});
            }

            // Create the portion and associate it with the property, landlord, and broker
            const portion = await Portion.create({
                ...portionData,
                property: property._id,
                landlord: landlord._id,
                broker: broker._id,
            });

            property.portions.push(portion._id);
            await property.save();

            res.status(201).json(portion);
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

    async getAllPortions(req, res) {
        try {
            const portions = await Portion.find();
            res.json(portions);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getPortionById(req, res) {
        try {
            const portion = await Portion.findById(req.params.id);
            if (!portion) {
                return res.status(404).json({ error: 'Portion not found' });
            }
            res.json(portion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = portionController;
