const { Book, Author, Genre } = require('../models');


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [Author, Genre]
        });
        console.log(books)
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: [Author, Genre]
        });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const [updated] = await Book.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBook = await Book.findByPk(req.params.id, {
                include: [Author, Genre]
            });
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};