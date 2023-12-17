const mongoose = require('mongoose');
const Landlord = require('../models/Landlord');

const isValidObjectId = mongoose.isValidObjectId;

const landlordController = {
    async createLandlord(req, res) {
        try {
            const landlord = await Landlord.create(req.body);
            res.status(201).json(landlord);
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Handle Mongoose validation errors
                const errors = {};
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });
                res.status(400).json({ errors });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },

    async getAllLandlords(req, res) {
        try {
            const landlords = await Landlord.find();
            res.json(landlords);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getLandlordById(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const landlord = await Landlord.findById(id);
            if (!landlord) {
                res.status(404).json({ error: 'Landlord not found' });
            } else {
                res.json(landlord);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateLandlord(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const landlord = await Landlord.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
            if (!landlord) {
                res.status(404).json({ error: 'Landlord not found' });
            } else {
                res.json(landlord);
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                // Handle Mongoose validation errors
                const errors = {};
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });
                res.status(400).json({ errors });
            } else {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },

    async deleteLandlord(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const landlord = await Landlord.findByIdAndDelete(id);
            if (!landlord) {
                res.status(404).json({ error: 'Landlord not found' });
            } else {
                res.json(landlord);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = landlordController;
