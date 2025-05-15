const db = require('../config/db');
const { DataTypes } = require('sequelize');

const models = {
    Book: require('./book')(db, DataTypes),
    Author: require('./author')(db, DataTypes),
    Genre: require('./genre')(db, DataTypes),
    User: require('./user')(db, DataTypes)
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    ...models,
    sequelize: db
};
