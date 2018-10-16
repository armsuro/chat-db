const DataTypes = require('sequelize');
const bcrypt = require('bcrypt');

const Schema = {
    'from': DataTypes.INTEGER,
    'text': DataTypes.TEXT,
    'type': DataTypes.ENUM(1, 2),
    'quote_id': DataTypes.INTEGER
};

const Options = {
    'tableName': 'message',
    'createdAt': 'created_at',
    'updatedAt': 'updated_at',
    'timestamps': true,
};

const Association = ({
    chat,
    users
}) => {
    chat.Message.belongsTo(chat.Quote, {
        foreignKey: 'quote_id',
        as: 'Quote'
    });
    chat.Message.belongsTo(users.Account, {
        foreignKey: 'from',
        as: 'From'
    });
};

module.exports = seq => {
    const model = seq.define('Message', Schema, Options);
    model.associate = Association;

    return model;
}