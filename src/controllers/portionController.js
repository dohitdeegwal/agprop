const mongoose = require('mongoose');
const Portion = require('../models/Portion');
const Property = require('../models/Property');
const Landlord = require('../models/Landlord');
const Broker = require('../models/Broker');

const isValidObjectId = mongoose.isValidObjectId;

const portionController = {
    async createPortion(req, res) {
        try {
            const { propertyId, landlordId, brokerId, ...portionData } = req.body;

            if (landlordId && !isValidObjectId(landlordId)) {
                return res.status(400).json({ error: 'Invalid landlord ID format' });
            }

            if (brokerId && !isValidObjectId(brokerId)) {
                return res.status(400).json({ error: 'Invalid broker ID format' });
            }

            // Check if the landlord exists
            const existingLandlord = await Landlord.findById(landlordId);
            if (!existingLandlord) {
                return res.status(404).json({ error: 'Landlord not found' });
            }

            // Check if the broker exists
            if (brokerId) {
                const existingBroker = await Broker.findById(brokerId);
                if (!existingBroker) {
                    return res.status(404).json({ error: 'Broker not found' });
                }
            }

            let property;

            // Check if the property exists
            if (propertyId && !isValidObjectId(propertyId)) {
                return res.status(400).json({ error: 'Invalid property ID format' });
            }

            if (propertyId) {
                property = await Property.findById(propertyId);
                if (!property) {
                    return res.status(404).json({ error: 'Property not found' });
                }
            } else {
                // Create a new property if propertyId is not provided
                property = await Property.create({ name: portionData.propertyName });
            }

            // Create the portion and associate it with the property, landlord, and broker
            const portion = await Portion.create({
                ...portionData,
                property: property._id,
                landlord: landlordId,
                broker: brokerId,
            });

            property.portions.push(portion._id);
            await property.save();

            res.status(201).json(portion);
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Mongoose validation error
                const validationErrors = Object.values(error.errors).map((err) => err.message);
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
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const portion = await Portion.findById(id);
            if (!portion) {
                return res.status(404).json({ error: 'Portion not found' });
            }
            res.json(portion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updatePortion(req, res) {
        try {
            const { propertyId, landlordId, brokerId, ...portionData } = req.body;

            if (landlordId && !isValidObjectId(landlordId)) {
                return res.status(400).json({ error: 'Invalid landlord ID format' });
            }

            if (brokerId && !isValidObjectId(brokerId)) {
                return res.status(400).json({ error: 'Invalid broker ID format' });
            }

            // Check if the landlord exists
            const existingLandlord = await Landlord.findById(landlordId);
            if (!existingLandlord) {
                return res.status(404).json({ error: 'Landlord not found' });
            }

            // Check if the broker exists
            if (brokerId) {
                const existingBroker = await Broker.findById(brokerId);
                if (!existingBroker) {
                    return res.status(404).json({ error: 'Broker not found' });
                }
            }

            let property;

            // Check if the property exists
            if (propertyId && !isValidObjectId(propertyId)) {
                return res.status(400).json({ error: 'Invalid property ID format' });
            }

            if (propertyId) {
                property = await Property.findById(propertyId);
                if (!property) {
                    return res.status(404).json({ error: 'Property not found' });
                }
            } else {
                // Create a new property if propertyId is not provided
                property = await Property.create({ name: portionData.propertyName });
            }

            // Update the portion and associate it with the property, landlord, and broker
            const portion = await Portion.findByIdAndUpdate(
                req.params.id,
                {
                    ...portionData,
                    property: property._id,
                    landlord: landlordId,
                    broker: brokerId,
                },
                { new: true }
            );

            property.portions.push(portion._id);
            await property.save();

            res.json(portion);
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Mongoose validation error
                const validationErrors = Object.values(error.errors).map((err) => err.message);
                res.status(400).json({ error: 'Validation Error', messages: validationErrors });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },

    async deletePortion(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const portion = await Portion.findById(id);
            if (!portion) {
                return res.status(404).json({ error: 'Portion not found' });
            }

            // Remove the portion from the associated property
            const property = await Property.findById(portion.property);
            if (property) {
                property.portions = property.portions.filter(
                    (portionId) => portionId.toString() !== id
                );
                await property.save();
            }

            // Delete the portion
            await Portion.findByIdAndDelete(id);

            res.json(portion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = portionController;
