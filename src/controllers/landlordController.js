const Landlord = require('../models/Landlord');

const landlordController = {
    async createLandlord(req, res) {
        try {
            const landlord = await Landlord.create(req.body);
            res.status(201).json(landlord);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
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
        try {
            const landlord = await Landlord.findById(req.params.id);
            res.json(landlord);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateLandlord(req, res) {
        try {
            const landlord = await Landlord.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.json(landlord);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteLandlord(req, res) {
        try {
            const landlord = await Landlord.findByIdAndDelete(req.params.id);
            res.json(landlord);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = landlordController;
