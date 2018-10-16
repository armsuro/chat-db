const DataTypes = require('sequelize');
const bcrypt = require('bcrypt');

const Schema = {
    'name': {
        'type': DataTypes.STRING,
        'allowNull': false
    },
    'customer_id': {
        'type': DataTypes.INTEGER,
        'allowNull': false
    },
    'repairshop_id': {
        'type': DataTypes.INTEGER,
        'allowNull': true
    },
};

const Options = {
    'tableName': 'quote',
    'createdAt': 'created_at',
    'updatedAt': 'updated_at',
    'timestamps': true
};

const Association = ({
    chat,
    users
}) => {
    chat.Quote.hasMany(chat.Message, {
        foreignKey: 'quote_id',
        as: 'Messages'
    });
    chat.Quote.belongsTo(users.Account, {
        foreignKey: 'repairshop_id',
        as: 'Repairshop'
    });
    chat.Quote.belongsTo(users.Account, {
        foreignKey: 'customer_id',
        as: 'Customer'
    });
};

module.exports = seq => {
    const model = seq.define('Quote', Schema, Options);
    model.associate = Association;

    return model;
}