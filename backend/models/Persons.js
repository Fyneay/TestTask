const db = require('./connection');

const Person = db.sequelize.define('persons', {
    id: {
        type: db.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            min: 0,
        }
    },
    lastname: {
        type: db.DataTypes.STRING(40),
        allowNull: false,
    },
    firstname: {
        type: db.DataTypes.STRING(40),
        allowNull: false,
    },
    middlename: {
        type: db.DataTypes.STRING(40),
        allowNull: true,
    },
    birthday: {
      type: db.DataTypes.DATEONLY,
        allowNull: false,
    },
    team_id: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id',
        }
    }
}, {timestamps: false})

module.exports = Person;