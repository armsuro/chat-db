'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('account', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM(1, 2),
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }).then(async () => {
            const pass = await bcrypt.hashSync('password', bcrypt.genSaltSync());
            return queryInterface.bulkInsert('account', [{
                'username': 'user1',
                'password': pass,
                'type': '1'
            }, {
                'username': 'user2',
                'password': pass,
                'type': '2'
            }]);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query("DROP TABLE account cascade;");
    }
};