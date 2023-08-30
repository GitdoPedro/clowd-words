const express = require('express');
const wordController = require('../controllers/wordController');

const router = express.Router();

router.post('/', wordController.create);
router.get('/:id',wordController.findById)
router.get('/', wordController.listAll);
router.put('/:id', wordController.update);
router.delete('/:id', wordController.delete);

module.exports = router;