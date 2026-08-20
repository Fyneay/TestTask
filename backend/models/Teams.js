const db = require('./connection');
const Person = require('./Persons')

const Team = db.sequelize.define('teams', {
    id: {
        type: db.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            min: 0,
        }
    },
    name: {
        type: db.DataTypes.STRING(60),
        allowNull: false,
    }
}, {timestamps: false});

Team.hasMany(Person, {
    foreignKey: 'team_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'team_persons'
})

Person.belongsTo(Team, {
    foreignKey: 'team_id',
    as: 'team_persons',
})

module.exports = Team;