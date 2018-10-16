'use strict';
module.exports = {

    up: async(queryInterface, Sequelize) => {
        let models = {};

        models.Account = queryInterface.sequelize.import('../../models/user/Account');

        await queryInterface.sequelize.sync({
            force: true
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('account');
    }
};