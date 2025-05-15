const db = require('../config/db');

const models = {
    Book: require('./book')(db, require('sequelize').DataTypes),
    Author: require('./author')(db, require('sequelize').DataTypes),
    Genre: require('./genre')(db, require('sequelize').DataTypes)
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
