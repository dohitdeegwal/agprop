const mongoose = require('mongoose');
const Broker = require('../models/Broker');

const isValidObjectId = mongoose.isValidObjectId;

const brokerController = {
    async createBroker(req, res) {
        try {
            const broker = await Broker.create(req.body);
            res.status(201).json(broker);
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

    async getAllBrokers(req, res) {
        try {
            const brokers = await Broker.find();
            res.json(brokers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getBrokerById(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const broker = await Broker.findById(id);
            if (!broker) {
                res.status(404).json({ error: 'Broker not found' });
            } else {
                res.json(broker);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateBroker(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const broker = await Broker.findByIdAndUpdate(
                id,
                req.body,
                { new: true, runValidators: true } // Make sure to run validators on update
            );
            if (!broker) {
                res.status(404).json({ error: 'Broker not found' });
            } else {
                res.json(broker);
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

    async deleteBroker(req, res) {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        try {
            const broker = await Broker.findByIdAndDelete(id);
            if (!broker) {
                res.status(404).json({ error: 'Broker not found' });
            } else {
                res.json(broker);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = brokerController;
