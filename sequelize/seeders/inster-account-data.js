'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    up: async (queryInterface, Sequelize) => {
    	const pass1 = await bcrypt.hashSync('password1', bcrypt.genSaltSync());
    	const pass2 = await bcrypt.hashSync('password2', bcrypt.genSaltSync());

        return queryInterface.bulkInsert('account', [{
            'username': 'user1',
            'password': pass1,
            'type': '1'
        }, {
            'username': 'user2',
            'password': pass2,
            'type': '2'
        }]);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};