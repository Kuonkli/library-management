const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const authorController = require('../controllers/authors');
const genreController = require('../controllers/genres');
const authController = require('../controllers/auth');
const authMiddleware = require('../controllers/middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use(authMiddleware);

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

// Author routes
router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorController.createAuthor);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);

// Genre routes
router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreById);
router.post('/genres', genreController.createGenre);
router.put('/genres/:id', genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;