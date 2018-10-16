const DataTypes = require('sequelize');
const bcrypt = require('bcrypt');

const Schema = {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.ENUM(1, 2)
};

const Options = {
    tableName: 'account',
    timestamps: false,
    hooks: {
        async beforeCreate(user) {
            return user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync());
        }
    }
};

const Association = () => {

};

module.exports = seq => {
    const model = seq.define('Account', Schema, Options);
    model.associate = Association;

    model.prototype.validPassword = async function(password) {
        return await bcrypt.compareSync(password, this.password);
    }

    model.prototype.toJSON =  function () {
      const values = Object.assign({}, this.get());

      delete values.password;
      return values;
    }
    
    return model;
}