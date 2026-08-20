const express = require('express');
const router = express.Router();

const {createPersonSchema, updatePersonSchema} = require('../services/validation/schemas/persons')
const validation = require('../middlewares/validate')
const personController = require('../controllers/personsController');

//router.use(validation(createPersonSchema))

router.get('/', personController.getAll);
router.get('/:id', personController.get);
router.post('/', validation(createPersonSchema) ,personController.create);
router.put('/:id', validation(updatePersonSchema) ,personController.update);
router.delete('/:id', personController.destroy);

module.exports = router;