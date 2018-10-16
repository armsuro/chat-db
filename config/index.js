const sequelize = require('./sequelize');

module.exports = {
	"sequelize": sequelize[process.env.NODE_ENV] || sequelize['development']
};