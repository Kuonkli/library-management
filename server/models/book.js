module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        publishYear: {
            type: DataTypes.INTEGER,
            field: 'publish_year'
        },
        isbn: {
            type: DataTypes.STRING
        },
        quantityInStock: {
            type: DataTypes.INTEGER,
            field: 'quantity_in_stock'
        }
    }, {
        tableName: 'books',
        timestamps: false
    });

    Book.associate = (models) => {
        Book.belongsTo(models.Author, { foreignKey: 'author_id' });
        Book.belongsTo(models.Genre, { foreignKey: 'genre_id' });
    };

    return Book;
};
