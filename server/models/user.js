module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    User.beforeSave(async (user) => {
        if (user.changed('password')) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    });

    return User;
};
