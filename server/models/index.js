const { sequelize, mongoose } = require('../config/db');
const { DataTypes } = require('sequelize');

const models = {
    Book: require('./book')(sequelize, DataTypes),
    Author: require('./author')(sequelize, DataTypes),
    Genre: require('./genre')(sequelize, DataTypes),
};

const User = require('./user');


Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    ...models,
    sequelize, // для PostgreSQL
    mongoose,  // подключение к MongoDB (если нужно явно)
    User       // модель пользователей MongoDB
};
