const { Author, Book }= require('../models');

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll({
            include: [Book]
        });
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findByPk(req.params.id, {
            include: [Book]
        });
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.json(author);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        const [updated] = await Author.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedAuthor = await Author.findByPk(req.params.id);
            res.json(updatedAuthor);
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const deleted = await Author.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Author deleted' });
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};