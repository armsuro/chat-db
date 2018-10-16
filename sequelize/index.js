const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../config/sequelize')[process.env.NODE_ENV];
const db = {};
console.log(config)
const sequelize = new Sequelize(config.database, config.username, config.password, config);


const loadDir = (dir, tag) => {
    if (!db[tag]) {
        db[tag] = {};
    }

    return fs
        .readdirSync(dir)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = sequelize['import'](path.join(dir, file));
            db[tag][model.name] = model;
        });
}

Promise.all([
    loadDir(__dirname + "/models/user", 'user'),
    loadDir(__dirname + "/models/chat", 'chat')
]).then(() => {
    for (let t in db) {
        for (let i in db[t]) {
            if (db[t][i].associate) {
                db[t][i].associate(db[t]);
            }
        }
    }
});

module.exports = Object.assign(sequelize, db);