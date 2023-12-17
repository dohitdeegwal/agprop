const Broker = require('../models/Broker');

const brokerController = {
    async createBroker(req, res) {
        try {
            const broker = await Broker.create(req.body);
            res.status(201).json(broker);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
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
        try {
            const broker = await Broker.findById(req.params.id);
            res.json(broker);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateBroker(req, res) {
        try {
            const broker = await Broker.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(broker);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteBroker(req, res) {
        try {
            const broker = await Broker.findByIdAndDelete(req.params.id);
            res.json(broker);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = brokerController;