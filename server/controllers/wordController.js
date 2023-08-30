const sequelize        = require('../config/db')
const createWordModel  = require('../models/wordModel');
const Word             = createWordModel(sequelize,sequelize.Sequelize.DataTypes);


const wordController = {
    async create(req, res) {
        try {
            const word  = await Word.create(req.body);
            
            return res.status(201).json(word);
        } catch (error) {
            console.error(req);
            return res.status(400).json(
                { error: 'Failed to create the word', details: error.message });
        }
    },

    async listAll(req, res) {
        try {
            const words = await Word.findAll();
            return  res.status(200).json(words);
        } catch (error) {
            console.error(error);
            return res.status(500).json(
                { message: 'Error retrieving words', error });
        }
    },

    async findById(req, res) {
        try {
            const word = await Word.findByPk(req.params.id);
            if (word) {
                return res.status(200).json(word);
            } else {
                return res.status(404).json(
                    { message: 'word not found' });
            }
        } catch (error) {
            return res.status(500).json(
                { message: 'Error retrieving word', error });
        }
    },

    
    async update(req, res) {
        try {
            const updatedWord = await Word.update(req.body, {
                where: { id: req.params.id },
            });
            if (updatedWord[0]) {
                return res.status(200).json(
                    { message: 'Word updated successfully' });
            } else {
                return res.status(404).json(
                    { message: 'Word not found' });
            }
        } catch (error) {
            return res.status(500).json(
                 { message: 'Error updating word', error });
        }
    },

   async delete(req, res) {
        try {
            const deletedWord = await Word.destroy({ where: { id: req.params.id } });
            if (deletedWord) {
                res.status(204).json({ message: 'Word deleted successfully' });
            } else {
                res.status(404).json({ message: 'Word not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting word', error });
        }
    }

};

module.exports = wordController;
