const Team = require("../models/Teams");
const db = require('../models/connection');
const {sendSuccess, sendFailure} = require("../services/httpSender");

async function getAll(req, res) {
    try {
        const {limit=5,offset=0} = req.query;
        const teams = await db.sequelize.query("SELECT * FROM teams ORDER BY id LIMIT $limit OFFSET $offset",{
            type: db.QueryTypes.SELECT,
            bind: {limit,offset},
        });
        sendSuccess(res, teams)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function get(req, res) {
    try {
        const id = req.params.id;
        const teams = await Team.findOne({
            where: {id}
        });
        sendSuccess(res, teams)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function create(req, res) {
    try {
        const teams = await Team.create(req.body);
        sendSuccess(res, teams)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const teams = await Team.update(req.body, {
            where: {id: id}
        });
        sendSuccess(res, teams)
    } catch (error) {
        sendFailure(res, error.message, 404)
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const teams = await Team.destroy({
            where: {id: id}
        });
        sendSuccess(res, teams)
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