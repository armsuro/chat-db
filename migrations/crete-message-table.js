'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('message', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            from: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'account'
                    },
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            quote_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'quote'
                    },
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query("DROP TABLE message cascade;");
    }
};