const express = require('express');
const router = express.Router();

const {createTeamSchema, updateTeamSchema} = require('../services/validation/schemas/teams');
const validation = require('../middlewares/validate')
const teamsController = require('../controllers/teamsController');

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.get);
router.post('/', validation(createTeamSchema),teamsController.create);
router.put('/:id', validation(updateTeamSchema),teamsController.update);
router.delete('/:id', teamsController.destroy);

module.exports = router;