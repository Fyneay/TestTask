const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
const {ConnectDBException} = require('../exceptions/dbException')

const db_name = process.env.DB_NAME || 'IRS';
const db_user = process.env.DB_USER || 'admsec';
const db_password = process.env.DB_PASSWORD || 'Crjhjcnm1';
const db_host = process.env.DB_HOST || 'localhost';
const db_port = process.env.DB_PORT || 5432;

//Экземпляр интерфейса Sequelize
const db = {}

const sequelize = new Sequelize(db_name, db_user, db_password, {
    dialect: 'postgres',
    host: db_host,
    port: Number(db_port),
    sync: {
        force: false,
    }
});

(async () => {
    try {
        if (await sequelize.authenticate()) {
            console.log("Аутентификация к БД прошла успешно")
        }
    } catch (error) {
        throw new ConnectDBException('Ошибка подключения к БД');
    }
})();


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.QueryTypes = QueryTypes;

module.exports = db;