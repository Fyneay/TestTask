const Person = require("../models/Persons");
const Team = require("../models/Teams");
const db = require('../models/connection');
const {sendSuccess, sendFailure} = require("../services/httpSender");

async function getAll(req, res) {
    try {
        const persons = await db.sequelize.query("SELECT persons.id, persons.lastname, persons.firstname, persons.middlename, persons.birthday,persons.team_id,team_persons.id as \"team_persons.id\", team_persons.name as \"team_persons.name\" FROM persons left outer join teams team_persons on persons.team_id = team_persons.id ORDER BY persons.id", {
            type: db.QueryTypes.SELECT,
            raw: false,
            nest: true
        });
        sendSuccess(res, persons)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function get(req, res) {
    try {
        const id = req.params.id;
        const persons = await Person.findOne({
            where: {id},
            include: {
                model: Team,
                as: "team_persons"
            }
        });
        sendSuccess(res, persons)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function create(req, res) {
    try {
        const persons = await Person.create(req.body);
        sendSuccess(res, persons)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const persons = await Person.update(req.body, {
            where: {id: id}
        });
        sendSuccess(res, persons)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const persons = await Person.destroy({
            where: {id: id}
        });
        sendSuccess(res, persons)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

module.exports = {
    getAll,
    get,
    create,
    update,
    destroy
}