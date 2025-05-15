module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            field: 'birth_date'
        },
        country: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'authors',
        timestamps: false
    });

    Author.associate = (models) => {
        Author.hasMany(models.Book, { foreignKey: 'author_id' });
    };

    return Author;
};
