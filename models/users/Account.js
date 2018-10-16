const DataTypes = require('sequelize');
const bcrypt = require('bcrypt');

const Schema = {
    'username': {
        'type': DataTypes.STRING,
        'unique': true
    },
    'password': DataTypes.STRING,
    'type': DataTypes.ENUM(1, 2)
};

const Options = {
    'tableName': 'account',
    'createdAt': 'created_at',
    'updatedAt': 'updated_at',
    'timestamps': true,
    'hooks': {
        async beforeCreate(user) {
            return user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync());
        }
    }
};

const Association = ({
    chat,
    users
}) => {
    users.Account.hasMany(chat.Quote, {
        foreignKey: 'repairshop_id',
        as: 'Repairshop'
    });
    users.Account.hasMany(chat.Quote, {
        foreignKey: 'customer_id',
        as: 'Customer'
    });
    users.Account.hasMany(chat.Message, {
        foreignKey: 'from',
        as: 'From'
    });
};

module.exports = seq => {
    const model = seq.define('Account', Schema, Options);
    model.associate = Association;

    model.prototype.validPassword = async function(password) {
        return await bcrypt.compareSync(password, this.password);
    }

    model.prototype.toJSON = function() {
        const values = Object.assign({}, this.get());

        delete values.password;
        return values;
    }

    return model;
}